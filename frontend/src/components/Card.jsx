import React from "react";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import ViewTask from "./ViewTask";
import AddTask from "./AddTask";
import { useStore } from "../context/Context-Hook";

const Card = ({ task }) => {
  const [detailModel, setDetailModel] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [modelTitle, setModelTitle] = useState("");
  const { deleteTask } = useStore();

  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="flex gap-2 flex-col">
        <h2 className="text-2xl font-semibold text-base">{task.title}</h2>
        <p className="text-xl wrap-break-word">
          {task.description.length > 50
            ? task.description.slice(0, 50) + "...."
            : task.description}
        </p>
        <p className="text-xl text-gray-600">
          Due: <span>{new Date(task.due).toLocaleDateString()}</span>
        </p>
      </div>
      <div className="flex gap-4 justify-end">
        <button
          onClick={() => {
            setDetailModel(true);
          }}
          className="text-3xl rounded-full bg-base text-white p-3 hover:text-base hover:bg-white transition-all duration-200 cursor-pointer hover:shadow"
        >
          <IoEye />
        </button>
        <button
          onClick={() => {
            setModelTitle("Edit Page");
            setShowModel(true);
          }}
          className="text-3xl rounded-full bg-base text-white p-3 hover:text-base hover:bg-white transition-all duration-200 cursor-pointer hover:shadow"
        >
          <MdEditSquare />
        </button>
        <button onClick={()=>deleteTask(task._id)} className="text-3xl rounded-full bg-base text-white p-3 hover:text-base hover:bg-red-300 transition-all duration-200 cursor-pointer hover:shadow">
          <MdDelete />
        </button>
      </div>

      {detailModel && (
        <div className="absolute-center w-screen bg-white/50 h-screen z-2">
          <ViewTask setDetailModel={setDetailModel} task={task} />
        </div>
      )}
      {showModel && (
        <div className="absolute-center w-screen bg-white/50 h-screen z-2">
          <AddTask
            modelTitle={modelTitle}
            task={task}
            setShowModel={setShowModel}
            showModel={showModel}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
