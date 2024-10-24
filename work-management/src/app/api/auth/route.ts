import connectDb from "@/app/helper/db";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    await connectDb();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.password !== password) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

        const token = jwt.sign({
            _id:user._id,
            name:user.name
        },process.env.JTW_KEY)

    const response =  NextResponse.json({
        message:"Login Sucess !!",
        success:true
    })
    response.cookies.set("authTone",token,{
        httpOnly:true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  // 1 day expiration
    });
    return response;

  } catch (error) {
    console.log("Error during authentication:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
