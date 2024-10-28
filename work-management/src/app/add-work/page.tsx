// "use client";
// import React, { useEffect, useState } from "react";
// import addtask from "../../../public/addtask.svg";
// import Image from "next/image";
// import { Work } from "@/models/work";

// const AddTask = () => {
//     const [task, setTask] = useState<Work>({
//         title: '',
//         content: '',
//         status: 'pending',
//         userid: '', // Placeholder for user ID
//     });

//     const addWorks = async () => {
//         try {
//             const userResponse = await fetch('/api/current');
//             if (userResponse.ok) {

//                 const userData = await userResponse.json();
//                 // Update the user ID in the task state
//                 setTask((prevTask: any) => ({
//                     ...prevTask,
//                     userid: userData._id,
//                 }));
//                 console.log(task);
//             } else {
//                 throw new Error('Failed to fetch user');
//             }

//             // Ensure task has a user ID before sending
//             if (!task.userid) {
//                 console.error("User ID is not set. Cannot add task.");
//                 return;
//             }

//             const response = await fetch('/api/work', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(task),
//             });

//             if (!response.ok) {
//                 throw new Error(`Error: ${response.status}`);
//             }

//             const data = await response.json();
//             console.log("Task added successfully:", data);
//         } catch (error) {
//             console.error("Error adding work:", error);
//         }
//     };

//     const handleSubmit = (event: React.FormEvent) => {
//         event.preventDefault();
//         addWorks();
//     };

//     return (
//         <div className="grid place-items-center min-h-screen text-black bg-gray-100">
//             <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
//                 <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
//                     <div className="my-8 flex justify-center">
//                         <Image src={addtask} style={{ width: "40%" }} alt="Add Task" />
//                     </div>
//                     Add Your Task
//                 </h1>

//                 <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                         <label htmlFor="task_title" className="block text-sm font-medium text-gray-700">
//                             Title
//                         </label>
//                         <input
//                             type="text"
//                             id="task_title"
//                             name="task_title"
//                             className="w-full p-3 mt-1 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             onChange={(event) => {
//                                 setTask({ ...task, title: event.target.value });
//                             }}
//                             value={task?.title || ''}
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="task_content" className="block text-sm font-medium text-gray-700">
//                             Content
//                         </label>
//                         <textarea
//                             id="task_content"
//                             rows={5}
//                             name="task_content"
//                             className="w-full p-3 mt-1 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             onChange={(event) => {
//                                 setTask({ ...task, content: event.target.value });
//                             }}
//                             value={task?.content || ''}
//                         />
//                     </div>

//                     <div>
//                         <label htmlFor="task_status" className="block text-sm font-medium text-gray-700">
//                             Status
//                         </label>
//                         <select
//                             id="task_status"
//                             name="task_status"
//                             className="w-full p-3 mt-1 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             onChange={(event) => {
//                                 setTask({ ...task, status: event.target.value });
//                             }}
//                             value={task?.status || ''}
//                         >
//                             <option value="none" disabled>
//                                 ---Select Status---
//                             </option>
//                             <option value="pending">Pending</option>
//                             <option value="completed">Completed</option>
//                         </select>
//                     </div>

//                     <div className="flex justify-between">
//                         <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200">
//                             Add Task
//                         </button>
//                         <button type="button" className="w-full ml-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-200">
//                             Clear
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddTask;

"use client";
import React, { useState } from "react";
import addtask from "../../../public/addtask.svg";
import Image from "next/image";
import { Work } from "@/models/work";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "@/context/userContext"; // Adjust the import path based on your folder structure

const AddTask = () => {
    const { user } = useUser(); // Retrieve user context
    const [task, setTask] = useState<Work>({
        title: '',
        content: '',
        status: 'pending',
        userid: user?._id || '', // Use user ID from context
    });

    const addWorks = async () => {
        try {
            // Ensure user ID is available
            if (!user?._id) {
                console.error("User ID is not set. Cannot add task.");
                toast.error("User not authenticated.");
                return;
            }

            const response = await fetch('/api/work', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...task, userid: user._id }), // Include user ID in the request
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            toast.success("Task added successfully!", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTask({ title: '', content: '', status: 'pending', userid: user._id }); // Reset task
        } catch (error) {
            console.error("Error adding work:", error);
            toast.error("Error adding task.");
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addWorks();
    };

    return (
        <div className="grid place-items-center min-h-screen text-black bg-gradient-to-br from-blue-100 to-gray-100">
            <ToastContainer />
            <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    <div className="mb-6 flex justify-center">
                        <Image src={addtask} style={{ width: "40%" }} alt="Add Task" />
                    </div>
                    Add Your Task
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="task_title" className="block text-sm font-semibold text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="task_title"
                            name="task_title"
                            className="w-full p-3 mt-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(event) => setTask({ ...task, title: event.target.value })}
                            value={task.title || ''}
                            placeholder="Enter task title"
                        />
                    </div>

                    <div>
                        <label htmlFor="task_content" className="block text-sm font-semibold text-gray-700">
                            Content
                        </label>
                        <textarea
                            id="task_content"
                            rows={4}
                            name="task_content"
                            className="w-full p-3 mt-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(event) => setTask({ ...task, content: event.target.value })}
                            value={task.content || ''}
                            placeholder="Describe your task"
                        />
                    </div>

                    <div>
                        <label htmlFor="task_status" className="block text-sm font-semibold text-gray-700">
                            Status
                        </label>
                        <select
                            id="task_status"
                            name="task_status"
                            className="w-full p-3 mt-2 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onChange={(event) => setTask({ ...task, status: event.target.value })}
                            value={task.status || ''}
                        >
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 ease-in-out"
                        >
                            Add Task
                        </button>
                        <button
                            type="button"
                            onClick={() => setTask({ title: '', content: '', status: 'pending', userid: user._id })}
                            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition duration-200 ease-in-out"
                        >
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
