"use clinet";
import Link from "next/link";
import React from "react";

const Navbar=() =>{
    return(
        <nav className="bg-blue-500 h-12 py-2 px-10 flex justify-between items-center ">
           <div>
                <h1><a href="/">Work Manager</a></h1>
           </div>
           <div>
            <ul className="flex space-x-3">
                <li><Link href="/" className="hover:text-blue-200">Home</Link></li>
                <li><Link href={"/add-work"} className="hover:text-blue-200">Add Work</Link></li>
                <li><Link href="/showwork" className="hover:text-blue-200">Show Work</Link></li>
            </ul>
           </div>
           <div>
            <ul className="flex space-x-3">
                <li><Link href="/login" className="hover:text-blue-200">Login</Link></li>
                <li><Link href="/signup" className="hover:text-blue-200">Signup</Link></li>
            </ul>
           </div>
        </nav>
    )
}

export default Navbar;