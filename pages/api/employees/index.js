import dbConnect from '../../../lib/mongodb';
import Employee from '../../../models/employee';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authOptions);

        console.log('API Session:', session);

        if (!session || !session.user) {
            return res.status(401).json({
                message: 'Please log in to access this resource',
                debug: {
                    hasSession: !!session,
                    hasUser: !!session?.user
                }
            });
        }

        await dbConnect();

        switch (req.method) {
            case 'GET':
                try {
                    const employees = await Employee.find().sort({ createdAt: -1 });
                    return res.status(200).json({
                        employees: employees || [],
                        message: employees.length === 0 ? 'No employees found' : null
                    });
                } catch (error) {
                    console.error('GET Error:', error);
                    return res.status(500).json({ message: 'Error fetching employees: ' + error.message });
                }

            case 'POST':
                try {
                    const { firstName, lastName, email, phone, role } = req.body;

                    const employee = await Employee.create({
                        firstName,
                        lastName,
                        email,
                        phone,
                        role,
                        createdBy: session.user.id,
                    });

                    return res.status(201).json({ message: 'Employee created', employee });
                } catch (error) {
                    console.error('POST Error:', error);
                    return res.status(500).json({ message: error.message });
                }

            default:
                return res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Handler Error:', error);
        return res.status(500).json({ message: 'Server error: ' + error.message });
    }
}