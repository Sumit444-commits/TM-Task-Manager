import React from "react";
import Card from "./Card";
import { useStore } from "../context/Context-Hook";
import { Atom } from "react-loading-indicators";

const CardsContainer = ({ status, tasks }) => {
  const { taskLoader } = useStore();
  return (
    <div>
      <div className="w-full bg-base text-white text-3xl font-bold text-center px-4 py-3 rounded-lg">
        {status.toUpperCase()}
      </div>
      {/* cards */}
      {taskLoader ? (
        <div className="flex-center content-center mt-25">
          <Atom color="#2563eb" size="medium" text="" textColor="" />
        </div>
      ) : (
        <div className="bg-base flex gap-4 flex-col p-4 mt-6 rounded-lg sm:h-[65.5vh] max-h-[65.5vh] h-auto overflow-auto">
          {tasks.length > 0 ? (
            tasks.map((task) => {
              return <Card key={task._id} task={task} />;
            })
          ) : (
            <div className="text-4xl text-white text-center">
              No Tasks Found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardsContainer;
