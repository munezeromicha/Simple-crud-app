import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
    },
    role: {
        type: String,
        enum: ['Admin', 'Staff'],
        default: 'Staff',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);