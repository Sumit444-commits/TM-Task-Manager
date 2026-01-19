import React from "react";
import { useState } from "react";
import { useStore } from "../context/Context-Hook";
import { useEffect } from "react";

const AddTask = ({ modelTitle, setShowModel, showModel, task }) => {
  const { addNewTask, editTask } = useStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Low",
    status: "Todo",
    due: "",
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        status: task.status,
        due: new Date(task.due).toISOString().slice(0, 10),
      });
    }
  }, [task]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.title === "" ||
        formData.description.length < 3 ||
        formData.due === ""
      ) {
        console.log("fill all the inputs");
        return;
      }
      setLoading(true);
      if (modelTitle === "Add Task") {
        await addNewTask(formData);
      } else {
        await editTask(task._id, formData);
      }
      setLoading(false);
      setShowModel(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute-center">
      <div className="mx-14">
        <div className="sm:w-[40rem] w-[30rem]">
          <h1 className="text-5xl font-bold text-white bg-base rounded-lg px-5 py-3">
            {modelTitle}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="border border-base bg-white mt-6 rounded-xl"
          >
            <div className="mx-6 my-8 flex flex-col gap-4 ">
              {/* title */}
              <div className="flex flex-col">
                <label htmlFor="title" className="text-3xl text-base mb-2">
                  Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Python Basics"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  name="title"
                  className="text-3xl px-4 py-2  border border-gray-300 focus:ring-brand focus:outline-none focus:border-base"
                />
              </div>
              {/* description */}
              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className="text-3xl text-base mb-2"
                >
                  Description<span className="text-red-500">*</span>
                </label>
                <textarea
                  className="text-3xl px-4 py-2  border border-gray-300 focus:ring-brand focus:outline-none focus:border-base"
                  name="description"
                  rows={3}
                  required
                  placeholder="Wanna Learn python with in week..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
              {/* priority */}
              <div className="flex flex-col">
                <label htmlFor="priority" className="text-3xl text-base mb-2">
                  Priority<span className="text-red-500">*</span>
                </label>
                <select
                  name="priority"
                  onChange={handleChange}
                  required
                  value={formData.priority}
                  className="text-3xl px-4 py-2  border border-gray-300 focus:ring-brand focus:outline-none focus:border-base"
                >
                  <option className="bg-[#004B8D]/60" value="Low">
                    Low
                  </option>
                  <option className="bg-[#0067B1]/60" value="Medium">
                    Medium
                  </option>
                  <option className="bg-[#00AEEF]/60" value="High">
                    high
                  </option>
                </select>
              </div>

              {/* Status */}
              <div className="flex flex-col">
                <label htmlFor="status" className="text-3xl text-base mb-2">
                  Status<span className="text-red-500">*</span>
                </label>
                <select
                  name="status"
                  value={formData.status}
                  required
                  onChange={handleChange}
                  className="text-3xl px-4 py-2  border border-gray-300 focus:ring-brand focus:outline-none focus:border-base"
                >
                  <option className="bg-[#E3F2FD]/60" value="Todo">
                    Todo
                  </option>
                  <option className="bg-[#2196F3]/60" value="In Progress">
                    In Progress
                  </option>
                  <option className="bg-[#00BCD4]/60" value="Done">
                    Done
                  </option>
                </select>
              </div>
              {/* Due Date */}
              <div className="flex flex-col">
                <label htmlFor="title" className="text-3xl text-base mb-2">
                  Due Date<span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="due"
                  required
                  value={formData.due}
                  onChange={handleChange}
                  className="text-3xl px-4 py-2  border border-gray-300 focus:ring-brand focus:outline-none focus:border-base"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowModel(!showModel)}
                  className="text-3xl w-full text-base rounded-lg bg-white border px-4 py-2 hover:bg-base/30 hover:text-base transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="text-3xl w-full text-white rounded-lg bg-base px-4 py-2 hover:bg-base/30 hover:text-base transition-all duration-300"
                >
                  {modelTitle == "Add Task" ? (
                    <>{loading ? "Loading..." : "Add"}</>
                  ) : (
                    <>{loading ? "Loading..." : "Edit"}</>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
