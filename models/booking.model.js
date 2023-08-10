import {Schema, model, models} from 'mongoose';

const bookingSchema = new Schema({
    date: {
        type: Date,
        required: [true, 'Date is required'],
        validate: {
            validator: function (value) {
                return value >= new Date();
            },
            message: 'Date must be in the future',
        },
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
    },
    tasks: {
        type: String,
        required: [true, 'At least one task is required'],
    },
    payment: {
        type: String,
        required: [true, 'Payment Type is required'],
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