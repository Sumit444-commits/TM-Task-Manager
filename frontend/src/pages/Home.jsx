import React, { useEffect } from "react";
import { useStore } from "../context/Context-Hook";
import { useNavigate } from "react-router-dom";
import { Mosaic } from "react-loading-indicators";
import { useState } from "react";
import CardsContainer from "../components/CardsContainer";
import AddTask from "../components/AddTask";
import { useMemo } from "react";

const Home = () => {
  const { isLoggedIn, user, loading, tasks } = useStore();
  const navigate = useNavigate();

  const [sortedBy, setSortedBy] = useState("recent");
  const [search, setSearch] = useState("");
  const [showModel, setShowModel] = useState(false);
  const [modelTitle, setModelTitle] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filterSearch = (task) => {
    return search
      ? task.title.toLowerCase().includes(search.toLowerCase())
      : true;
  };
  const filteredTasks = useMemo(() => {
    const filtered = tasks.filter((task) => filterSearch(task));
    if (sortedBy == "alphabaticaly") {
      filtered.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    }
    return filtered;
  }, [search, filterSearch, tasks, sortedBy]);

  if (loading) {
    return (
      <div className="padd-container absolute-center">
        <Mosaic color="#2563eb" size="large" />;
      </div>
    );
  }

  return (
    <section className="padd-container mt-6 sm:mb-0 mb-12">
      <div>
        <h1 className="text-6xl font-bold text-base">
          Hello <span className="text-gray-600">{user && user.username}.</span>
        </h1>
        <div className="flex-between mt-12 flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              setShowModel(true);
              setModelTitle("Add Task");
            }}
            className="text-3xl text-white bg-base px-4 py-2 rounded-lg"
          >
            Add Task
          </button>
          <input
            type="text"
            name="search"
            placeholder="search..."
            value={search}
            onChange={handleChange}
            className="text-3xl px-4 py-2  border border-gray-300 focus:ring-brand focus:outline-none focus:border-base"
          />
          <div className="relative">
            <select
              className="text-3xl text-base rounded-lg px-4 py-2  border border-gray-300 focus:ring-brand focus:outline-none focus:border-base appearance-none w-60"
              value={sortedBy}
              onChange={(e) => setSortedBy(e.target.value)}
            >
              <option value="recent">Recent</option>
              <option value="alphabaticaly">Alphabaticaly</option>
            </select>
            <svg
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-base"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="grid sm:grid-cols-3  sm:gap-6 gap-20 mt-12">
          {filteredTasks.length > 0 ? (
            <>
              <CardsContainer
                tasks={filteredTasks.filter((task) => task.status == "Todo")}
                status={"TODO"}
                setModelTitle={setModelTitle}
                setShowModel={setShowModel}
              />
              <CardsContainer
                tasks={filteredTasks.filter(
                  (task) => task.status == "In Progress"
                )}
                status={"In Progress"}
              />
              <CardsContainer
                tasks={filteredTasks.filter((task) => task.status == "Done")}
                status={"Done"}
              />
            </>
          ) : (
            <div
              className={`absolute-center text-6xl font-black text-base`}
            >
              No Task Found
            </div>
          )}
        </div>
      </div>

      {showModel && (
        <div className="absolute-center w-screen bg-white/50 h-screen z-2">
          <AddTask
            modelTitle={modelTitle}
            setShowModel={setShowModel}
            showModel={showModel}
          />
        </div>
      )}
    </section>
  );
};

export default Home;
