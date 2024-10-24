// // import { NextResponse } from 'next/server'
// // import type { NextRequest } from 'next/server'
 
// // // This function can be marked `async` if using `await` inside
// // export function middleware(request: NextRequest) {
// //     console.log("middleware executed");

// //     const authtoken = request.cookies.get("authTone")?.value;
// //     console.log(authtoken);
// //     const loggedInUserNotAcessPath = request.nextUrl.pathname ==="/login" || request.nextUrl.pathname ==="/signup";
// //     if (loggedInUserNotAcessPath) {
// //             if(authtoken){
// //                 return NextResponse.redirect(new URL("/"));
// //             }
// //         }
// //  return NextResponse.redirect(new URL('/home', request.url))
// // }
 
// // // See "Matching Paths" below to learn more
// // export const config = {
// //   matcher: '/add-work',
// // }

// // // import { NextRequest, NextResponse } from "next/server";

// // // // This function can be marked `async` if using `await` inside
// // // export function middleware(request:NextRequest) {
// // //   console.log("middleware executed");

// // //   const authToken = request.cookies.get("authToken")?.value;

// // //   if (
// // //     request.nextUrl.pathname === "/api/auth" 
// // //   ) {
// // //     return;
// // //   }

// // //   const loggedInUserNotAccessPaths =
// // //     request.nextUrl.pathname === "/login" ||
// // //     request.nextUrl.pathname == "/signup";

// // //   if (loggedInUserNotAccessPaths) {
// // //     // access not secured route
// // //     if (authToken) {
// // //       return NextResponse.redirect(new URL("/profile", request.url));
// // //     }
// // //   } else {
// // //     // accessing secured route

// // //     // if (!authToken) {
// // //     //   if (request.nextUrl.pathname.startsWith("/api")) {
// // //     //     return NextResponse.json(
// // //     //       {
// // //     //         message: "Access Denied !!",
// // //     //         success: false,
// // //     //       },
// // //     //       {
// // //     //         status: 401,
// // //     //       }
// // //     //     );
// // //     //   }

// // //       return NextResponse.redirect(new URL("/login", request.url));
// // //     } 
// // //   }


// // //   //   return NextResponse.redirect(new URL("/home", request.url));


// // // // See "Matching Paths" below to learn more
// // // export const config = {
// // //   matcher: [
// // //     "/",
// // //     "/add-task",
// // //     "/show-tasks",
   
  
// // //   ],
// // // };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  
  // Get the token from the cookies
  const authtoken = request.cookies.get("authTone")?.value;
 

  // Paths where logged-in users should not have access
  const loggedInUserNotAccessPath = request.nextUrl.pathname === "/login" || request.nextUrl.pathname === "/signup";

  // If the user is logged in and tries to access login/signup, redirect them to the home page
  if (loggedInUserNotAccessPath && authtoken) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin)); // Added origin here
  }

  // If the user is not logged in and trying to access restricted pages, redirect to login
  if (!authtoken && (request.nextUrl.pathname === "/add-work" || request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/show-work")) {
    return NextResponse.redirect(new URL("/login", request.nextUrl.origin)); // Added origin here
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/add-work','/show-work', '/signup'],
};
