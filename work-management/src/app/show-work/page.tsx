// "use client";
// import React, { useContext, useEffect, useState } from "react";

// const ShowTasks = () => {




//   return (
//     <div className="grid grid-cols-12 mt-3">
//       <div className="col-span-6 col-start-4">
//         <h1 className="text-3xl mb-3 ">Your tasks </h1>

//         {/* {tasks.map((task) => (
//           <Task
//             task={task}
//             key={task._id}
//             deleteTaskParent={deleteTaskParent}
//           />
//         ))} */}
//       </div>
//     </div>
//   );
// };

// export default ShowTasks;
"use client";
import React from "react";

const Task = () => {
  const user = {
    name: "vishal",
  };

  const tasks = [
    {
      _id: "6717fbd094afaf152512dabc",
      title: "Project 1",
      content: "Complete this Work management Project",
      status: "pending",
      userid: "6717ae7f94afaf152512dab3",
      addedDate: "2024-10-22T19:24:00.958Z",
    },
    {
      _id: "6717fbd094afaf152512dabe",
      title: "Project 2",
      content: "Start the new feature development",
      status: "completed",
      userid: "6717ae7f94afaf152512dab3",
      addedDate: "2024-10-23T10:12:00.958Z",
    },
  ];

  function deleteTask(taskId: string) {
    console.log(`Deleting task with ID: ${taskId}`);
  }

  return (
    <div className="space-y-6">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`shadow-lg border border-gray-700 rounded-lg transition-colors duration-300 ${
            task.status === "completed"
              ? "bg-green-700 hover:bg-green-600"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          <div className="p-6">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-white">{task.title}</h1>
              <span
                onClick={() => deleteTask(task._id)}
                className="transition-colors bg-red-600 hover:bg-red-500 text-white rounded-full w-9 h-9 flex justify-center items-center cursor-pointer"
              >
                🗑️
              </span>
            </div>
            <p className="text-gray-300 mt-2">{task.content}</p>
            <div className="flex justify-between mt-4 text-sm">
              <p className="text-left">
                Status:{" "}
                <span
                  className={`font-semibold ${
                    task.status === "completed"
                      ? "text-green-300"
                      : "text-yellow-300"
                  }`}
                >
                  {task.status}
                </span>
              </p>
              <p className="text-right text-gray-400">
                Author: <span className="font-semibold">{user.name}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;
