// import React from 'react'

import { POST } from "@/app/api/users/route";
import { cookies } from "next/headers";

// function currentUser() {

//   return (
    
//   )
// }

// export default currentUser
// import { User } from "@/models/user";
// export async function signUp(user) {
//   const result = await fetch("/api/users",{
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             },
//         body: user
//     } )
//     return result.json()

// }



// export async function login(user : {
//     username: string;
//     password: string;
// }) {
//     const result = await fetch("/api/auth",{
//           method: "POST",
//           headers: {
//               "Content-Type": "application/json",
//               },
//           body: user
//       } )
//       return result.json()
  
//   }
import Cookies from 'js-cookie';
import { NextResponse } from "next/server";
import { useRouter } from "next/navigation";

// export async function currentUser() {
//     console.log("calling current user");
//     const router =useRouter();

//     try {
//         const token = Cookies.get("authToen");
//         // console.log("Retrieved token:", token); // Log the token
//         // if (!token) {
//         //   console.error("No authToken found in cookies.");
//         // }
        
//         // if(token){
//         //     console.log("token found");
//         // }
//         if(!token){
//                 return ;
//         }
//         const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/current`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`, // Include the token in the header
//                 'Content-Type': 'application/json',
//             },
//             credentials: 'include', // Include cookies in the request
//         });

//         if (!result.ok) {
//             throw new Error(`Error: ${result.status} ${result.statusText}`);
//         }

//         const userData = await result.json();
//         return userData;
//     } catch (error) {
//         console.error("Failed to fetch or parse user data:", error);
//         throw error;
//     }
// }

export async function currentUser() {
    console.log("calling current user");

    try {
        const token = Cookies.get('authTone');

        if (!token) {
            console.warn("No auth token found. User not logged in.");
            return null; // Explicitly return null when there is no token
        }

        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/current`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the header
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies in the request
        });

        if (!result.ok) {
            throw new Error(`Error: ${result.status} ${result.statusText}`);
        }

        const userData = await result.json();
        return userData;
    } catch (error) {
        console.error("Failed to fetch or parse user data:", error);
        throw error;
    }
}

export async function Logout() {
    console.log("calling Logout");

    try {
      

        const result = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/logout`, {
            method: 'POST', // Ensure this is POST
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies in the request
        });

        if (!result.ok) {
            throw new Error(`Error: ${result.status} ${result.statusText}`);
        }
        console.log(result.body);
        console.log("logged out successfully");
        Cookies.remove("authTone"); // Remove the cookie upon successful logout
        return result;
    } catch (error) {
        console.error("Failed to fetch or parse user data:", error);
        return { ok: false }; // Return an object indicating failure
    }
}


