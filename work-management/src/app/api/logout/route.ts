// // pages/api/logout.js (or .ts)
// import { NextRequest, NextResponse } from "next/server";

// export async function POST(request: NextRequest) {
//     console.log(request.cookies.get("authTone"));
//     const response = NextResponse.json({
//         message: "Logged out",
//         success: true,
//     });

//     // Clear the auth token cookie
//      response.cookies.set("authTone", "", {
//         expires: new Date(0), // Expire the cookie
//     });

//     return response;
// }
// pages/api/logout.ts

import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({
        message: "Logged out",
        success: true,
    });

    // Clear the auth token cookie by setting it to an empty string and expiring it immediately
    response.cookies.set("authTone", "", {
        path: "/",
        expires: new Date(0), // Set expiration date to remove the cookie
    });
   
    return response;
}
