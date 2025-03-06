import { hash } from 'bcryptjs';
import dbConnect from '../../../lib/mongodb';
import User from '../../../models/user';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        await dbConnect();

        const { firstName, lastName, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const hashedPassword = await hash(password, 12);

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            message: 'User created',
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            }
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}