import mongoose from "mongoose";
import {Work} from '@/models/work'
import { NextRequest,NextResponse } from "next/server";

export async function GET(request:NextRequest){
    const work = await Work.find();
    return NextResponse.json(work)
    
}

export async function POST(request:NextRequest){
    const {title,content,status,userid} = await request.json();
    const work = new Work({title,content,status,userid});
    await work.save();
    return NextResponse.json(work)
}