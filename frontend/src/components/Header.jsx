import React from "react";
import { SiTask } from "react-icons/si";
import { Link } from "react-router-dom";
import { useStore } from "../context/Context-Hook";

const Header = () => {
  const { isLoggedIn,  } = useStore();
  return (
    <header className="bg-base py-4 px-14">
      <div className="padd-container flex-between">
        <div className="flex gap-1 items-center">
          <figure>
            <SiTask className="text-white text-5xl" />
          </figure>
          <span className="text-4xl font-semibold text-white ">TM</span>
        </div>

        {/* Login and Signup */}
        <div className="flex gap-4">
          {isLoggedIn ? (
            <Link
              to={"/logout"}
              className="text-3xl text-white bg-red-500 rounded-lg px-4 py-2"
            >
              Logout
            </Link>
          ) : (
            <>
              <Link to={"/login"} className="text-3xl text-white px-4 py-2">
                Login
              </Link>
              <Link
                to={"/register"}
                className="text-3xl text-base bg-white px-4 py-2 rounded-lg"
              >
                Signup{" "}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
