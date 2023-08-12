import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/user.model";



export async function POST(req, res) {
  try {
    await mongooseConnect();
    const body = await req.json();
    console.log(body);
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }),{status: 500})
    }
      const newUser = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        phoneNumber: body.phoneNumber,
        email: body.email,
        password: body.password,
    });
    return new Response(JSON.stringify(newUser))
  } catch (error) {
    console.error('Error creating user:', error);
    if(error.code === 11000){
      return new Response(JSON.stringify({ error: "User already exists" }),{status: 500})
    }
    return new Response(JSON.stringify({ error: error }), {
      status: 500, // Internal Server Error status code
    });
  }
    
    
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

