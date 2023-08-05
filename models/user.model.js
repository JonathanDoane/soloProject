import {Schema, model, models} from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        minLength: [10, 'Phone number must be at least 10 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
            validator: (email) => {
              // Simple email format validation using regex
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return emailRegex.test(email);
            },
            message: 'Invalid email format',
          },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters long'],
    },
}, {timestamps: true});

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      } catch (error) {
        return next(error);
      }
    }
    next();
  });

export const User =  models?.User || model('User', userSchema);
