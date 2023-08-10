import { authOptions } from "@/lib/auth";
import { mongooseConnect } from "@/lib/mongoose";
import { Booking } from "@/models/booking.model";
import { getServerSession } from "next-auth";


export async function POST(req, res) {
    try {
        await mongooseConnect(); // Assuming this function sets up the mongoose connection
        const body = await req.json();

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
    

    export async function GET(req, res) {
        try {
            const session = await getServerSession(authOptions);

            
            await mongooseConnect(); // Assuming this function sets up the mongoose connection
            
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
