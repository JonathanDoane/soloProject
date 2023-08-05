import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user.model";
import { useSession, signIn } from "next-auth/react";


export async function POST(req, res) {
    await mongooseConnect();
    const body = await req.body;
    const errors = {};
    if (!body.firstName) {
      errors.firstName = "First name is required";
    }

    if (!body.lastName) {
      errors.lastName = "Last name is required";
    }

    if (!body.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    }

    if (!body.email) {
      errors.email = "Email is required";
    } else if (!isValidEmail(body.email)) {
      errors.email = "Invalid email format";
    }

    if (!body.password) {
      errors.password = "Password is required";
    }

    // Check if there are any errors
    if (Object.keys(errors).length > 0) {
      return (res.status(422).json({errors}));
    }
    const existingUser = await User.findOne({ email: body.email });
    if(existingUser) {
        return (res.status(409).json({ message: 'User already exists' }));
    }
    const newUser = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        email: body.email,
        password: body.password,
    });
    const savedUser = await newUser.save();
    await signIn('Credentials', {
        email: body.email,
        password: body.password,
    });
    return (res.status(200).json(savedUser));


}

function isValidEmail(email) {
    const emailRegex = /^[\w-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }