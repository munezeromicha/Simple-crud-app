import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please provide a first name'],
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Please provide a last name'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);