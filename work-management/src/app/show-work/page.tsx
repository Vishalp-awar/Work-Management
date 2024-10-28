// "use client";
// import React, { useEffect, useState } from "react";

// const Task = () => {
//   const [user, setUser] = useState<{ name: string } | null>(null);
//   const [tasks, setTasks] = useState<any[]>([]);

//   const fetchCurrentUser = async () => {
//     try {
//       const response = await fetch('/api/current');
//       if (response.ok) {
//         const userData = await response.json();
//         console.log("Fetched user data:", userData); // Log to verify user data
//         setUser(userData);
//       } else {
//         console.error("Failed to fetch user data");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };
  
//   const fetchTasks = async () => {
//     try {
//       const response = await fetch('/api/work');
//       if (response.ok) {
//         const taskData = await response.json();
//         setTasks(taskData);
//       } else {
//         console.error("Failed to fetch tasks");
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const deleteTask = async (taskId: string) => {
//     try {
//       const response = await fetch(`/api/work/${taskId}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
//         console.log(`Deleted task with ID: ${taskId}`);
//       } else {
//         console.error("Failed to delete task");
//       }
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const updateTaskStatus = async (taskId: string, newStatus: string) => {
//     try {
//       const response = await fetch(`/api/work/${taskId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ status: newStatus }),
//       });
//       if (response.ok) {
//         const updatedTask = await response.json();
//         setTasks((prevTasks) =>
//           prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
//         );
//         console.log(`Updated task with ID: ${taskId} to status: ${newStatus}`);
//       } else {
//         console.error("Failed to update task status");
//       }
//     } catch (error) {
//       console.error("Error updating task status:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchCurrentUser().then();
//       await fetchTasks();
//     };
    
//     fetchData();
//   }, []);
  

//   return (
//     <div className="p-8 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Task Manager</h1>
//       {tasks.length === 0 ? (
//         <p className="text-gray-500 text-center">No tasks available.</p>
//       ) : (
//         <div className="space-y-8">
//           {tasks.map((task) => (
//             <div
//               key={task._id}
//               className={`p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl ${
//                 task.status === "completed" ? "bg-green-100" : "bg-gray-100"
//               }`}
//             >
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
//                 <span
//                   onClick={() => deleteTask(task._id)}
//                   className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 cursor-pointer transition-colors"
//                   title="Delete Task"
//                 >
//                   🗑️
//                 </span>
//               </div>
//               <p className="text-gray-600 mt-4">{task.content}</p>
//               <div className="flex justify-between mt-4 items-center text-sm">
//                 <p className="text-gray-500">
//                   Status:{" "}
//                   <span
//                     className={`font-semibold ${
//                       task.status === "completed" ? "text-green-600" : "text-yellow-600"
//                     }`}
//                   >
//                     {task.status}
//                   </span>
//                 </p>
//                 <div className="flex items-center space-x-3">
//                   <p className="text-gray-400">Author: <span className="font-medium">{user?.name || "Unknown"}</span></p>
//                   <button
//                     onClick={() => {
//                       const newStatus = task.status === "completed" ? "pending" : "completed";
//                       updateTaskStatus(task._id, newStatus);
//                     }}
//                     className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
//                       task.status === "completed" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
//                     } text-white`}
//                   >
//                     Mark as {task.status === "completed" ? "Pending" : "Completed"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // export default Task;
// "use client";
// import React, { useEffect, useState } from "react";

// interface TaskType {
//   _id: string;
//   title: string;
//   content: string;
//   status: string;
// }

// interface UserType {
//   name: string;
// }

// const Task = () => {
//   const [user, setUser] = useState<UserType | null>(null);
//   const [tasks, setTasks] = useState<TaskType[]>([]);

//   // Fetch current user data
//   const fetchCurrentUser = async () => {
//     try {
//       const response = await fetch('/api/current');
//       if (response.ok) {
//         const userData = await response.json();
//         console.log("Fetched user data:", userData); // Log to verify user data
//         setUser(userData);
//       } else {
//         console.error("Failed to fetch user data");
//       }
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   // Fetch tasks data
//   const fetchTasks = async () => {
//     try {
//       const response = await fetch('/api/work');
//       if (response.ok) {
//         const taskData = await response.json();
//         setTasks(taskData);
//       } else {
//         console.error("Failed to fetch tasks");
//       }
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   // Delete a task
//   const deleteTask = async (taskId: string) => {
//     try {
//       const response = await fetch(`/api/work/${taskId}`, { method: 'DELETE' });
//       if (response.ok) {
//         setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
//         console.log(`Deleted task with ID: ${taskId}`);
//       } else {
//         console.error("Failed to delete task");
//       }
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   // Update task status
//   const updateTaskStatus = async (taskId: string, newStatus: string) => {
//     try {
//       const response = await fetch(`/api/work/${taskId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ status: newStatus }),
//       });
//       if (response.ok) {
//         const updatedTask = await response.json();
//         setTasks((prevTasks) =>
//           prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
//         );
//         console.log(`Updated task with ID: ${taskId} to status: ${newStatus}`);
//       } else {
//         console.error("Failed to update task status");
//       }
//     } catch (error) {
//       console.error("Error updating task status:", error);
//     }
//   };

//   // Fetch user and tasks on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       await fetchCurrentUser();
//       await fetchTasks();
//     };
    
//     fetchData();
//   }, []);

//   return (
//     <div className="p-8 max-w-3xl mx-auto">
//       <h1 className="text-3xl font-bold text-sky-50 mb-6 text-center">Task Manager</h1>
//       {tasks.length === 0 ? (
//         <p className="text-gray-500 text-center">No tasks available.</p>
//       ) : (
//         <div className="space-y-8">
//           {tasks.map((task) => (
//             <div
//               key={task._id}
//               className={`p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl ${
//                 task.status === "completed" ? "bg-green-100" : "bg-gray-100"
//               }`}
//             >
//               <div className="flex justify-between items-center">
//                 <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
//                 <span
//                   onClick={() => deleteTask(task._id)}
//                   className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 cursor-pointer transition-colors"
//                   title="Delete Task"
//                 >
//                   🗑️
//                 </span>
//               </div>
//               <p className="text-gray-600 mt-4">{task.content}</p>
//               <div className="flex justify-between mt-4 items-center text-sm">
//                 <p className="text-gray-500">
//                   Status:{" "}
//                   <span
//                     className={`font-semibold ${
//                       task.status === "completed" ? "text-green-600" : "text-yellow-600"
//                     }`}
//                   >
//                     {task.status}
//                   </span>
//                 </p>
//                 <div className="flex items-center space-x-3">
//                   <p className="text-gray-400">Author: <span className="font-medium">{user?.name || "Unknown"}</span></p>
//                   <button
//                     onClick={() => {
//                       const newStatus = task.status === "completed" ? "pending" : "completed";
//                       updateTaskStatus(task._id, newStatus);
//                     }}
//                     className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
//                       task.status === "completed" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
//                     } text-white`}
//                   >
//                     Mark as {task.status === "completed" ? "Pending" : "Completed"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Task;
"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for the toast notifications

interface TaskType {
  _id: string;
  title: string;
  content: string;
  status: string;
}

interface UserType {
  name: string;
}

const Task = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [tasks, setTasks] = useState<TaskType[]>([]);

  // Fetch current user data
  const fetchCurrentUser = async () => {
    // Here you would use user._id from context instead of calling the API
    // You might not need this function anymore
    // Set user state with actual user data or context
  };

  // Fetch tasks data
  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/work');
      if (response.ok) {
        const taskData = await response.json();
        setTasks(taskData);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Delete a task
  const deleteTask = async (taskId: string) => {
    try {
      const response = await fetch(`/api/work/${taskId}`, { method: 'DELETE' });
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
        toast.success(`Deleted task with Title: ${tasks?.title}`); // Show success toast
      } else {
        console.error("Failed to delete task");
        toast.error("Failed to delete task"); // Show error toast
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Error deleting task"); // Show error toast
    }
  };

  // Update task status
  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/work/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task._id === taskId ? updatedTask : task))
        );
        toast.success(
            <div>
              {/* Updated task with Title: <strong>{updatedTask?.title}</strong>
              <br /> */}
             Updated task's status to: <strong>{newStatus}</strong>
            </div>
          );
      } else {
        console.error("Failed to update task status");
        toast.error("Failed to update task status"); // Show error toast
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      toast.error("Error updating task status"); // Show error toast
    }
  };

  // Fetch user and tasks on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await fetchCurrentUser();
    await fetchTasks();
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-sky-50 mb-6 text-center">Task Manager</h1>
      <ToastContainer /> {/* Add ToastContainer here */}
      {tasks.length === 0 ? (
        <p className="text-gray-500 text-center">No tasks available.</p>
      ) : (
        <div className="space-y-8">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`p-6 rounded-lg shadow-lg transition-all transform hover:scale-105 hover:shadow-2xl ${
                task.status === "completed" ? "bg-green-100" : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
                <span
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 cursor-pointer transition-colors"
                  title="Delete Task"
                >
                  🗑️
                </span>
              </div>
              <p className="text-gray-600 mt-4">{task.content}</p>
              <div className="flex justify-between mt-4 items-center text-sm">
                <p className="text-gray-500">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      task.status === "completed" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {task.status}
                  </span>
                </p>
                <div className="flex items-center space-x-3">
                <button
                    onClick={() => {
                      const newStatus = task.status === "completed" ? "pending" : "completed";
                      updateTaskStatus(task._id, newStatus);
                    }}
                    className={`px-3 py-1 rounded-full text-sm font-semibold transition-all ${
                      task.status === "completed" ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
                    } text-white`}
                  >
                    Mark as {task.status === "completed" ? "Pending" : "Completed"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Task;
