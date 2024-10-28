
// 'use client';
// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { currentUser } from '@/service/userService';
// import mongoose, { Types } from 'mongoose';
// import Cookies from 'js-cookie';
// import { cookies } from 'next/headers';
// interface User {

//   _id: Types.ObjectId ,
//   name: string,
//   email: string,
//   about: string,
//   profileUrl: string,
//   __v: Number
// }

// interface UserContextType {
//   user: User | null;
// }

// export const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
  
//   const check = Cookies.get("authTone");
//   useEffect(() => {
//     const fetchUser = async () => {
   
//       try {
//       if(check){
//         console.log("cookies avibale now");
//         const userData = await currentUser();
//         if (userData) {
//           setUser(userData);
//         } else {
//           setUser(null);

//           console.warn("User not found or unauthorized, retrying...");
//           setTimeout(fetchUser, 2000); // Retry after 2 seconds if user is not found
//         }
//       }else{
//         console.log("no Authtoken avilable");
//       }
      
//       } catch (error) {
//         console.error("Error fetching user:", error);
//         setTimeout(fetchUser, 2000); // Retry on error after 2 seconds
//       }
//     };
  
//     fetchUser(); // Initial call
//   }, [check]);
  
  
    
//   return (
//     <UserContext.Provider value={{user}}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // export const useUser = (): UserContextType => {
// //   const context = useContext(UserContext);
// //   if (!context) {
// //     throw new Error('useUser must be used within a UserProvider');
// //   }
// //   return context;
// // };

// // userContext.tsx
// export const useUser = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };

// // befor logout all working
// 'use client';
// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { currentUser } from '@/service/userService';
// import Cookies from 'js-cookie';
// import mongoose, { Types } from 'mongoose';

// interface User {
//   _id: Types.ObjectId;
//   name: string;
//   email: string;
//   about: string;
//   profileUrl: string;
//   __v: number;
// }

// interface UserContextType {
//   user: User | null;
// }

// export const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);
  
//  useEffect(() => {
//   const fetchUser = async () => {
//       const token = Cookies.get('authTone'); // or use getAuthToneCookie() if not using js-cookie

//       if (!token) {
//           console.warn("No auth token found. User not logged in.");
//           setUser(null); // Ensure user is set to null if not authenticated
//           return; // Stop further execution if token is missing
//       }

//       try {
//           const userData = await currentUser();
//           if (userData) {
//               setUser(userData);
//           } else {
//               console.warn("User not found or unauthorized.");
//               setUser(null);
//           }
//       } catch (error) {
//           console.error("Error fetching user:", error);
//       }
//   };

//   fetchUser(); // Initial call
// }, []);

//   return (
//     <UserContext.Provider value={{ user }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };

// 'use client';
// import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
// import { currentUser } from '@/service/userService';
// import Cookies from 'js-cookie';
// import mongoose, { Types } from 'mongoose';

// interface User {
//   _id: Types.ObjectId;
//   name: string;
//   email: string;
//   about: string;
//   profileUrl: string;
//   __v: number;
// }

// interface UserContextType {
//   user: User | null;
//   logout: () => void;
// }

// export const UserContext = createContext<UserContextType | undefined>(undefined);

// export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       const token = Cookies.get('authTone');

//       if (!token) {
//         console.warn("No auth token found. User not logged in.");
//         setUser(null);
//         return;
//       }

//       try {
//         const userData = await currentUser();
//         if (userData) {
//           setUser(userData);
//         } else {
//           console.warn("User not found or unauthorized.");
//           setUser(null);
//         }
//       } catch (error) {
//         console.error("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   // Logout function
//   const logout = async () => {
//     try {
//       const response = await fetch("/api/logout", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         setUser(null); // Clear the user context
//         Cookies.remove('authTone'); // Remove the auth token cookie client-side
//         console.log("User logged out successfully.");
//       } else {
//         console.error("Failed to log out:", await response.json());
//       }
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <UserContext.Provider value={{ user, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = (): UserContextType => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };
"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { currentUser, Logout } from '@/service/userService';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
interface User {
    _id: string; // Update as per your ID type
    name: string;
    email: string;
    about: string;
    profileUrl: string;
    __v: number;
}

interface UserContextType {
    user: User | null;
    logout: () => Promise<void>; // Add logout type here
    setUser: (user: User | null) => void; 
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();
    useEffect(() => {
        const fetchUser = async () => {
            const token = Cookies.get('authTone');

            if (!token) {
                console.warn("No auth token found. User not logged in.");
                setUser(null);
                return;
            }

            try {
                const userData = await currentUser();
                if (userData) {
                    setUser(userData);
                } else {
                    console.warn("User not found or unauthorized.");
                    setUser(null);
                }
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        fetchUser(); // Initial call
    }, []);

    // Define logout function
    const logout = async () => {
        try {
            const res = await Logout(); // Call your logout API
            if (res.ok) {
                console.log("logged out");
                setUser(null); // Clear user state
                router.push('/');
            } else {
                console.log("Logout failed:", res.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <UserContext.Provider value={{ user, logout,setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
