// // "use clinet";
// // import Link from "next/link";

// // import React, { useContext } from "react";
// // import { UserContext } from "@/context/userContext";

// // const Navbar=() =>{
    
// //     const userContext = useContext(UserContext);
// //     const user = userContext?.user;
  
// //     if (!user) {
// //       return <p>Loading user data...</p>;
// //     }
  
// //     console.log(user);
// //     return(
// //         <nav className="bg-blue-500 h-12 py-2 px-10 flex justify-between items-center ">
// //            <div>
// //                 <h1><a href="/">Work Manager</a></h1>
// //            </div>
// //            <div>
// //             <ul className="flex space-x-3">
// //                 <li><Link href="/" className="hover:text-blue-200">Home</Link></li>
// //                 <li><Link href={"/add-work"} className="hover:text-blue-200">Add Work</Link></li>
// //                 <li><Link href="/show-work" className="hover:text-blue-200">Show Work</Link></li>
// //             </ul>
// //            </div>
// //            <div>
// //             <ul className="flex space-x-3">
// //                 <li><Link href="/login" className="hover:text-blue-200">Login</Link></li>
// //                 <li><Link href="/signup" className="hover:text-blue-200">Signup</Link></li>
// //             </ul>
// //            </div>
// //         </nav>
// //     )
// // }

// // export default Navbar;  
// "use client";
// import React, { useContext } from "react";
// import { UserContext } from "@/context/userContext";
// import Link from "next/link";

// const Navbar = () => {
//     const userContext = useContext(UserContext);
//     const user= userContext?.user;
//     console.log(user?.name + ' user in nav');
//     return (
//         <nav className="bg-blue-500 h-12 py-2 px-10 flex justify-between items-center">
//             <div>
//                 <h1><Link href="/">Work Manager</Link></h1>
//             </div>
//             <div>
//                 <ul className="flex space-x-3">
//                     {
//                         user && (
//                             <>
//                             <li><Link href="/" className="hover:text-blue-200">Home</Link></li>
//                             <li><Link href="/add-work" className="hover:text-blue-200">Add Work</Link></li>
//                             <li><Link href="/show-work" className="hover:text-blue-200">Show Work</Link></li>
//                             </>
//                         )
//                     }
                    
//                 </ul>
//             </div>
//             <div>
//                 <ul className="flex space-x-3">
//                     {
//                         user && (
//                             <>
                            
//                     <li><Link href="/login" className="hover:text-blue-200">Logout</Link></li>
//                             </>
//                         )
//                     } : <>
                        
//                     <li><Link href="/login" className="hover:text-blue-200">Login</Link></li>
//                     <li><Link href="/signup" className="hover:text-blue-200">Signup</Link></li>
//                     </>
//                 </ul>
//             </div>
//         </nav>
//     );
// }

// export default Navbar"
"use client";
import React, { useContext, useEffect } from "react";
import { UserContext, useUser } from "@/context/userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const userContext = useContext(UserContext);
    console.log(userContext);
    const { user, logout } = useUser(); // Destructure user and logout from context

    useEffect(() => {
        // Log the user whenever it changes
        if (user?.name) {
            console.log(user?.name + ' user in nav');
        } else {
            console.log('User is logged out');
        }
    }, [userContext?.user]); // Dependency array includes user to run effect on change

    return (
        <nav className="bg-blue-500 h-12 py-2 px-10 flex justify-between items-center">
            <div>
                <h1><Link href="/">Work Manager</Link></h1>
            </div>
            <div className={user ? "flex" : "ml-auto flex"}>
                <ul className="flex space-x-3">
                    {user?.name ? (
                        <>
                            <li><Link href="/" className="hover:text-blue-200">Home</Link></li>
                            <li><Link href="/add-work" className="hover:text-blue-200">Add Work</Link></li>
                            <li><Link href="/show-work" className="hover:text-blue-200">Show Work</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link href="/login" className="hover:text-blue-200">Login</Link></li>
                            <li><Link href="/signup" className="hover:text-blue-200">Signup</Link></li>
                        </>
                    )}
                </ul>
            </div>
            {user && (
                <div>
                    <ul className="flex space-x-3">
                        <li><button onClick={logout} className="hover:text-blue-200">Logout</button></li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
