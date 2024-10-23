"use client";
import React, { useState } from "react";

const AddTask = () => {
  const [task, setTask] = useState({
    title: "",
    content: "",
    status: "none",
    userId: "64a506ab413f1d5bcafcdbec",
  });

  return (
    <div className="grid place-items-center min-h-screen text-black bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Your Task
        </h1>

        <form action="#!" className="space-y-6">
          {/* Task title */}
          <div>
            <label
              htmlFor="task_title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="task_title"
              name="task_title"
              className="w-full p-3 mt-1 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(event) => {
                setTask({ ...task, title: event.target.value });
              }}
              value={task.title}
            />
          </div>

          {/* Task content */}
          <div>
            <label
              htmlFor="task_content"
              className="block text-sm font-medium text-gray-700"
            >
              Content
            </label>
            <textarea
              id="task_content"
              rows={5}
              name="task_content"
              className="w-full p-3 mt-1 rounded-lg bg-gray-50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(event) => {
                setTask({ ...task, content: event.target.value });
              }}
              value={task.content}
            />
          </div>

          {/* Task status */}
          <div>
            <label
              htmlFor="task_status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              id="task_status"
              name="task_status"
              className="w-full p-3 mt-1 rounded-lg bg-gray-50 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(event) => {
                setTask({ ...task, status: event.target.value });
              }}
              value={task.status}
            >
              <option value="none" disabled>
                ---Select Status---
              </option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Button actions */}
          <div className="flex justify-between">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-200">
              Add Task
            </button>
            <button
              type="button"
              className="w-full ml-4 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-200"
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
