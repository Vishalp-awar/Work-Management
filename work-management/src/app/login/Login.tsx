    "use client";
    import { useRouter } from "next/navigation";
    import React, { useState } from "react";

    const Login = () => {
    const router = useRouter();
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    const  handlelogin = async ()=>
        {

            try{
                const response = await fetch('api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body : JSON.stringify(loginData),
                }
                
            )
            if(response.ok){
                alert("Login Sucessfull....");
                router.push('/');
                return;
            }
            }catch(error){
                console.error(error, "calling auth api");
            }
            }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-lg">
            <h1 className="text-4xl font-bold text-center text-white">Login</h1>

            <form action={handlelogin} className="space-y-6">
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
                >
                Reset
                </button>
            </div>
            </form>
        </div>
        </div>
    );
    };

    export default Login;
