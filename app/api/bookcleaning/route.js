import { authOptions } from "@/lib/auth";
import { mongooseConnect } from "@/lib/mongoose";
import { Booking } from "@/models/booking.model";
import { getServerSession } from "next-auth";


export async function POST(req, res) {
    try {
        await mongooseConnect();
        const body = await req.json();
        console.log("body:", body);

        const existingBooking = await Booking.find({
            user: body.user,
        }); 
        console.log("existingBooking:", existingBooking);

        const newBooking = await Booking.create({
            date: body.date,
            time: body.time,
            tasks: body.tasks,
            payment: body.payment,
            notes: body.notes,
            user: body.user,
        });

        return new Response(JSON.stringify(newBooking));
    } catch (error) {
        console.error('Error creating booking:', error);
        return new Response(JSON.stringify({ error: error }), {
            status: 500, // Internal Server Error status code
        });
    }
}


    export async function PUT(req, res) {
        try {
              await mongooseConnect(); 
        const{searchParams} = new URL(req.url);
        const bookingID = searchParams.get('id');
        const body = await req.json();
        const updatedBooking = await Booking.findByIdAndUpdate({_id: bookingID}, body, {new: true, runValidators: true});
        return new Response(JSON.stringify(updatedBooking));
        } catch (error) {
            console.error('Error updating booking:', error);
            return new Response(JSON.stringify({ error: error }), {
                status: 500, // Internal Server Error status code
            });
        }
      
    }


    

    export async function GET(req, res) {
        const{searchParams} = new URL(req.url); 
        const bookingID = searchParams.get('id');
        await mongooseConnect(); 

        if(bookingID){
            const booking = await Booking.findById(bookingID);
            return new Response(JSON.stringify(booking));   
        }else {
            try {
            const session = await getServerSession(authOptions);

            
            
            const bookings = await Booking.find({user: session?.user?.id});
            // console.log("GET bookings:", bookings);
            return new Response(JSON.stringify(bookings));
        } catch (error) {
            console.error('Error getting bookings:', error);
            return new Response(JSON.stringify({ error: error }), {
                status: 500, // Internal Server Error status code
            });
        }
        }

        
}

export async function DELETE(req, res) {
    await mongooseConnect();
    const{searchParams} = new URL(req.url);
    const bookingID = searchParams.get('id');
    const deletedBooking = await Booking.findByIdAndDelete(bookingID);
    return new Response(JSON.stringify(deletedBooking));
}

