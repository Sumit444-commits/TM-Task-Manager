import React from "react";

const ViewTask = ({ setDetailModel, task }) => {
  return (
    <div className="absolute-center">
      <div className="mx-14">
        <div className="sm:w-[40rem] w-[30rem]">
          <h1 className="text-5xl font-bold text-white bg-base rounded-lg px-5 py-3">
            Task Details
          </h1>
          <div className="border border-base bg-white mt-6 rounded-xl">
            <div className="mx-6 my-8 flex flex-col gap-4 ">
              {/* title */}
              <div className="flex flex-col gap-8">
                <h3 className="text-4xl font-bold text-base">{task.title}</h3>
                <p className="text-2xl tracking-[0.05rem] wrap-break-word">
                  {task.description}
                </p>
                <p className="text-2xl tracking-[0.05rem] font-bold ">
                  Priority:{" "}
                  <span className="font-medium text-base">{task.priority}</span>
                </p>
                <p className="text-2xl tracking-[0.05rem] font-bold ">
                  Status:{" "}
                  <span className="font-medium text-base">{task.status}</span>
                </p>
                <p className="text-2xl tracking-[0.05rem] font-bold ">
                  Due Date:{" "}
                  <span className="font-medium text-base">
                    {new Date(task.due).toLocaleDateString()}
                  </span>
                </p>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setDetailModel(false)}
                  className="text-3xl w-full text-base rounded-lg bg-white border px-4 py-2 hover:bg-base/30 hover:text-base transition-all duration-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
