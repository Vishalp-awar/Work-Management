"use client";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
    const router = useRouter()
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    about: "",
    profileUrl: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
        try{
            const response = await fetch('api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(signupData),
            }
            
        )
        if(response.ok){
            alert("User is created");
            router.push('/login');
            return;
        }
        }catch(error){
            console.error(error);
        }
  };

  return (
    <div className="flex justify-center items-center  bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-white">Sign Up</h1>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 border-none outline-none transition-all duration-300"
              placeholder="Enter your name"
              id="name"
              value={signupData.name}
              onChange={handleInputChange}
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 border-none outline-none transition-all duration-300"
              placeholder="Enter your email"
              id="email"
              value={signupData.email}
              onChange={handleInputChange}
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 border-none outline-none transition-all duration-300"
              placeholder="Enter your password"
              id="password"
              value={signupData.password}
              onChange={handleInputChange}
            />
          </div>

          {/* About Input */}
          <div>
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              About
            </label>
            <input
              type="text"
              name="about"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 border-none outline-none transition-all duration-300"
              placeholder="Tell us about yourself"
              id="about"
              value={signupData.about}
              onChange={handleInputChange}
            />
          </div>

          {/* Profile URL Input */}
          <div>
            <label
              htmlFor="profileUrl"
              className="block text-sm font-medium text-gray-400 mb-2"
            >
              Profile URL
            </label>
            <input
              type="url"
              name="profileUrl"
              className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500 border-none outline-none transition-all duration-300"
              placeholder="Enter your profile URL"
              id="profileUrl"
              value={signupData.profileUrl}
              onChange={handleInputChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all duration-300"
            >
              Sign Up
            </button>
            <button
              type="button"
              className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-all duration-300"
              onClick={() =>
                setSignupData({
                  name: "",
                  email: "",
                  password: "",
                  about: "",
                  profileUrl: "",
                })
              }
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
