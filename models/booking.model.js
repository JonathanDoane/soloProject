import {Schema, model, models} from 'mongoose';

const bookingSchema = new Schema({
    date: {
        type: Date,
        required: [true, 'Date is required'],
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
    },
    tasks: {
        type: [String],
        required: [true, 'Tasks are required'],
    },
    payment: {
        type: String,
        required: [true, 'Payment is required'],
    },
    notes: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {timestamps: true});

export const Booking = models?.Booking || model('Booking', bookingSchema);