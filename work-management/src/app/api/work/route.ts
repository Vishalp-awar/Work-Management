// import mongoose from "mongoose";
// import {Work} from '@/models/work'
// import { NextRequest,NextResponse } from "next/server";

// export async function GET(request:NextRequest){
//     const work = await Work.find();
//     return NextResponse.json(work)
    
// }

// export async function POST(request:NextRequest){
//     const {title,content,status,userid} = await request.json();
//     const work = new Work({title,content,status,userid});
//     await work.save();
//     return NextResponse.json(work)
// }
import mongoose from "mongoose";
import { Work } from '@/models/work';
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/app/helper/db";

export async function GET(request: NextRequest) {
    try {
        await connectDb(); // Ensure database is connected
        const work = await Work.find();
        return NextResponse.json(work);
    } catch (error) {
        console.error("Error fetching work:", error);
        return NextResponse.json({ error: "Failed to fetch work" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        await connectDb(); // Ensure database is connected
        const { title, content, status, userid } = await request.json();
        console.log(title, content, status, userid);

        // Validate input
        if (!title || !content || !status || !userid) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const work = new Work({ title, content, status, userid });
        await work.save();
        return NextResponse.json(work, { status: 201 });
    } catch (error) {
        console.error("Error creating work:", error);
        return NextResponse.json({ error: "Failed to create work" }, { status: 500 });
    }
}
