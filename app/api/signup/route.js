import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user.model";



export async function POST(req, res) {
    await mongooseConnect();
    const body = await req.json();
    console.log(body);
    const existingUser = await User.findOne({ email: body.email });
    if(existingUser) {
      console.log('User already exists')
        
    }
      const newUser = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        email: body.email,
        password: body.password,
    });
    return new Response(JSON.stringify(newUser))
    
    // const newUser = new User({
    //     firstName: body.firstName,
    //     lastName: body.lastName,
    //     phoneNumber: body.phoneNumber,
    //     email: body.email,
    //     password: body.password,
    // });
    
}

function isValidEmail(email) {
    const emailRegex = /^[\w-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

