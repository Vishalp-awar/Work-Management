//     "use client";
//     import { useRouter } from "next/navigation";
//     import React, { useState } from "react";
// import { ToastContainer } from "react-toastify";

//     const Login = () => {
//     const router = useRouter();
//     const [loginData, setLoginData] = useState({
//         email: "",
//         password: "",
//     });

//     const  handlelogin = async ()=>
//         {

//             try{
//                 const response = await fetch('api/auth', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     body : JSON.stringify(loginData),
//                 }
                
//             )
//             if(response.ok){
//                 alert("Login Sucessfull....");
//                 router.push('/');
//                 return;
//             }
//             }catch(error){
//                 console.error(error, "calling auth api");
//             }
//             }

//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-900">
//         <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-lg">
//             <h1 className="text-4xl font-bold text-center text-white">Login</h1>

//             <form action={handlelogin} className="space-y-6">
//             {/* Email Input */}
//             <div>
//                 <label
//                 htmlFor="user_email"
//                 className="block text-sm font-medium text-gray-400 mb-2"
//                 >
//                 Email
//                 </label>
//                 <input
//                 type="email"
//                 className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 border-none outline-none transition-all duration-300"
//                 placeholder="Enter your email"
//                 id="user_email"
//                 name="user_email"
//                 onChange={(event) => {
//                     setLoginData({
//                     ...loginData,
//                     email: event.target.value,
//                     });
//                 }}
//                 value={loginData.email}
//                 />
//             </div>

//             {/* Password Input */}
//             <div>
//                 <label
//                 htmlFor="user_password"
//                 className="block text-sm font-medium text-gray-400 mb-2"
//                 >
//                 Password
//                 </label>
//                 <input
//                 type="password"
//                 className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 border-none outline-none transition-all duration-300"
//                 placeholder="Enter your password"
//                 id="user_password"
//                 onChange={(event) => {
//                     setLoginData({
//                     ...loginData,
//                     password: event.target.value,
//                     });
//                 }}
//                 value={loginData.password}
//                 />
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-center space-x-4">
//                 <button
//                 type="submit"
//                 className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
                
//             >
//                 Login
//                 </button>
//                 <button
//                 type="button"
//                 className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all duration-300"
//                 >
//                 Reset
//                 </button>
//             </div>
//             </form>
//             <ToastContainer
// position="top-right"
// autoClose={5000}
// hideProgressBar={false}
// newestOnTop={false}
// closeOnClick
// rtl={false}
// pauseOnFocusLoss
// draggable
// pauseOnHover
// theme="light"
// />

//         </div>
//         </div>
//     );
//     };

//     export default Login;
"use client";
import { useUser } from "@/context/userContext"; // Update the path according to your structure
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { setUser } = useUser(); // Get setUser from context
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    if (!loginData.email || !loginData.password) {
      toast.error("Email and password are required.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch("api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Set user in context
        setUser(data.user);

        // Trigger success toast
        toast.success("Login Successful!", {
          position: "top-right",
          autoClose: 3000,
        });

        // Redirect to home page after success
        setTimeout(() => {
          router.push("/");
        }, 3000); // Wait 3 seconds before redirecting
      } else {
        // Trigger error toast
        toast.error(data.error || "Login Failed. Please check your credentials.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error(error, "calling auth API");
      // Trigger error toast for unexpected errors
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-white">Login</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevent form submission
            handleLogin(); // Call handleLogin on form submission
          }}
          className="space-y-6"
        >
          {/* Email Input */}
          <div>
            <label
              htmlFor="user_email"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 border-none outline-none transition-all duration-300"
              placeholder="Enter your email"
              id="user_email"
              name="user_email"
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  email: event.target.value,
                });
              }}
              value={loginData.email}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="user_password"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 border-none outline-none transition-all duration-300"
              placeholder="Enter your password"
              id="user_password"
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  password: event.target.value,
                });
              }}
              value={loginData.password}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
            >
              Login
            </button>
            <button
              type="button"
              className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all duration-300"
              onClick={() => setLoginData({ email: "", password: "" })}
            >
              Reset
            </button>
          </div>
        </form>

        {/* Toast Container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
    </div>
  );
};

export default Login;
