import connectDb from "@/app/helper/db";
import { Work } from "@/models/work";
import mongoose from "mongoose";
import { NextRequest,NextResponse } from "next/server";




export async function GET(request: NextRequest, { params }: { params: { userid: string } }) 
{
    const userid = params.userid
        console.log(userid);
    try{
    await connectDb();
     const tasks = await  Work.find({
         userid: userid
        })
        return NextResponse.json(tasks, {status:200});
    }catch(error){
        return NextResponse.json({error:'Error fetching tasks'}, {status:500});
    }
}