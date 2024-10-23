// import connectDb from "@/app/helper/db";
// import { Work } from "@/models/work";
// import mongoose from "mongoose";
// import { NextRequest } from "next/server";




// export async function GET(request:NextRequest){
//     const { searchParams } = new URL(request.url);
//     const workid = searchParams.get('workid');
    
//     if(workid){
//         try{
//             await connectDb();
            
            
//             const data = Work.findById(new mongoose.Types.ObjectId(query) : _id);
//             return new Response(JSON.stringify(data), {status:200});
//         }catch(error){
//             return new Response(JSON.stringify(error), {status:500});
//         }
//     }
// }
import connectDb from "@/app/helper/db";
import { Work } from "@/models/work";
import mongoose from "mongoose";
import { NextRequest,NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const workid = searchParams.get('workid');  // Get the 'workid' from the query params
    
    if (workid) {
        try {
            await connectDb();  // Ensure database connection

            // Check if the workid is a valid MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(workid)) {
                return new Response(JSON.stringify({ error: "Invalid work ID" }), { status: 400 });
            }

            // Find the work by its ID
            const data = await Work.findById(new mongoose.Types.ObjectId(workid));
            
            // If no work found, return 404
            if (!data) {
                return new Response(JSON.stringify({ error: "Work not found" }), { status: 404 });
            }

            // Return the found work data as a response
            return new Response(JSON.stringify(data), { status: 200 });
        } catch (error) {
            // Return error response if something goes wrong
            return new Response(JSON.stringify({ error: "Error finding work" }), { status: 500 });
        }
    } else {
        // If 'workid' is not provided in the query
        return new Response(JSON.stringify({ error: "workid not provided" }), { status: 400 });
    }
}


export async function POST(request:NextRequest){
    
}

export async function PUT(request: NextRequest, { params }: { params: { workid: string } }) {
    const workid = params.workid;  // Capture workid from the dynamic URL segment

    // Parse the request body
    const { status } = await request.json();
    
    if (!mongoose.Types.ObjectId.isValid(workid)) {
        return new NextResponse(JSON.stringify({ error: "Invalid work ID" }), { status: 400 });
    }

    try {
        // Find the work by ID and update its status
        await connectDb();
        const updatedWork = await Work.findByIdAndUpdate(
            workid, 
            { status }, 
            { new: true } // Return the updated document
        );

        if (!updatedWork) {
            return new NextResponse(JSON.stringify({ error: "Work not found" }), { status: 404 });
        }

        return new NextResponse(JSON.stringify(updatedWork), { status: 200 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Error updating work" }), { status: 500 });
    }
}


export async function DELETE(request:NextRequest){
    
}