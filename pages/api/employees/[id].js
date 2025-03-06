import dbConnect from '../../../lib/mongodb';
import Employee from '../../../models/employee';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
    try {
        const session = await getServerSession(req, res, authOptions);

        if (!session || !session.user) {
            return res.status(401).json({ message: 'Please log in to access this resource' });
        }

        const { id } = req.query;

        if (!id) {
            return res.status(400).json({ message: 'Employee ID is required' });
        }

        await dbConnect();

        switch (req.method) {
            case 'GET':
                try {
                    const employee = await Employee.findById(id);

                    if (!employee) {
                        return res.status(404).json({ message: 'Employee not found' });
                    }

                    return res.status(200).json({ employee });
                } catch (error) {
                    return res.status(500).json({ message: error.message });
                }

            case 'PUT':
                try {
                    const { firstName, lastName, phone } = req.body;

                    const employee = await Employee.findByIdAndUpdate(
                        id,
                        { firstName, lastName, phone },
                        { new: true, runValidators: true }
                    );

                    if (!employee) {
                        return res.status(404).json({ message: 'Employee not found' });
                    }

                    return res.status(200).json({ message: 'Employee updated', employee });
                } catch (error) {
                    console.error('PUT Error:', error);
                    return res.status(500).json({ message: error.message });
                }

            case 'DELETE':
                try {
                    const employee = await Employee.findByIdAndDelete(id);

                    if (!employee) {
                        return res.status(404).json({ message: 'Employee not found' });
                    }

                    return res.status(200).json({ message: 'Employee deleted' });
                } catch (error) {
                    console.error('DELETE Error:', error);
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