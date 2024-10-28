import { NextRequest, NextResponse } from "next/server";
import Jwt from "jsonwebtoken";
import { User } from "@/models/user";

export async function GET(request: NextRequest) {
    // Retrieve the token from cookies
    const authtoken = request.cookies.get("authTone")?.value;
    
    // Check if token exists
    if (!authtoken) {
        return NextResponse.json({ error: "Authorization token is missing" }, { status: 401 });
    }

    try {
        // Verify the token
        const data = Jwt.verify(authtoken, process.env.JWT_KEY || '');
        

        console.log(data);

        const user = await User.findById(data._id).select('-password');
        // Return the user data as JSON
        return NextResponse.json(user);
    } catch (error) {
        console.error("Error verifying token:", error);
        
        // Return an error response if token verification fails
        return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
}
