// // import connectDb from "@/app/helper/db";
// // import { User } from "@/models/user";
// // import { NextRequest, NextResponse } from "next/server";
// // // import bcrypt from "bcryptjs";
// // import jwt from "jsonwebtoken";
// // export async function POST(request: NextRequest) {
// //   try {
// //     const { email, password } = await request.json();

// //     if (!email || !password) {
// //       return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
// //     }

// //     await connectDb();
// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return NextResponse.json({ error: "User not found" }, { status: 404 });
// //     }

// //     if (user.password !== password) {
// //       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
// //     }

// //         const token = jwt.sign({
// //             _id:user._id,
// //             name:user.name
// //         },process.env.JTW_KEY)

// //     const response =  NextResponse.json({
// //         message:"Login Sucess !!",
// //         success:true
// //     })
// //     response.cookies.set("authTone",token,{
// //         httpOnly:true,
// //         expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  // 1 day expiration
// //     });
// //     return response;

// //   } catch (error) {
// //     console.log("Error during authentication:", error);
// //     return NextResponse.json({ error: "Server error" }, { status: 500 });
// //   }
// // }
// import connectDb from "@/app/helper/db";
// import { User } from "@/models/user";
// import { NextRequest, NextResponse } from "next/server";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";

// export default async function POST(request: NextRequest) {
//   try {
//     const { email, password } = await request.json();

//     // Check for missing fields
//     if (!email || !password) {
//       return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
//     }

//     // Connect to database
//     await connectDb();

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Compare the entered password with the stored hashed password
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { _id: user._id, name: user.name },
//       process.env.JWT_KEY, // Ensure JWT_KEY is set in .env
//       { expiresIn: "1d" } // Token valid for 1 day
//     );

//     // Set the token in cookies
//     const response = NextResponse.json({
//       message: "Login Success!",
//       success: true,
//     });
    
//     response.cookies.set("authTone", token, {
//       httpOnly: true,
//       expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiration
//     });

//     return response;

//   } catch (error) {
//     console.log("Error during authentication:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

import connectDb from "@/app/helper/db";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { currentUser } from "@/service/userService";

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

    // const token = jwt.sign({ _id: user._id, name: user.name }, process.env.JWT_KEY || 'vishal@2550');
    // const response = NextResponse.json({ message: "Login Success!", success: true });
    
    // response.cookies.set("authTone", token, {
    //   httpOnly: true,
    //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiration
    // });

    // return response;
     // Generate JWT token
  
     const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.JWT_KEY || 'default_secret', // Use a default secret for local development
      { expiresIn: "1d" } // Token valid for 1 day
    );

    // Create a response and set the cookie
    const response = NextResponse.json({
      message: "Login Success!",
      success: true,
      user: { // Include user data in the response
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    // response.cookies.set("authTone", token, {
    //   sameSite: "lax",
    //   httpOnly: true,
    //   path: '/', // Ensure the cookie is accessible throughout the site
    //   expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiration
    // });

    response.cookies.set("authTone", token, {
       path: '/',
        sameSite: 'Lax',
        path: '/', // Ensure the cookie is accessible throughout the site
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day expiration
       });
    // In your login function
console.log('Setting cookie authTone with value:', response.cookies); // Check what you are setting



    return response;
  } catch (error) {
    console.log("Error during authentication:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
