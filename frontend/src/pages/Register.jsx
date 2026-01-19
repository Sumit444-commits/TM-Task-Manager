import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/Context-Hook";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { api, storeTokenInLS, isLoggedIn } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${api}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        storeTokenInLS(data.token);
        navigate("/");
      } else {
        setError(data.extraDetails ? data.extraDetails : data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="padd-container absolute-center flex-center">
      <div className="mx-14 ">
        <div className="sm:w-[40rem] w-[30rem]">
          <h1 className="text-5xl font-bold text-base pl-5">Register</h1>
          <form
            onSubmit={handleSubmit}
            className="border border-base mt-6 rounded-xl"
          >
            <div className="mx-6 my-8 flex flex-col gap-8 ">
              <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                name="username"
                className="text-3xl px-4 py-2  border border-gray-300 focus:ring-brand focus:outline-none focus:border-base"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                name="email"
                className="text-3xl px-4 py-2  border border-gray-300 focus:ring-brand focus:outline-none focus:border-base"
              />
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  name="password"
                  className="text-3xl px-4 py-2 w-full border border-gray-300 focus:ring-brand focus:outline-none focus:border-base"
                />
                <p
                  className={`${
                    error != "" ? "block text-red-600 text-xl " : "hidden"
                  }`}
                >
                  {error}
                </p>
              </div>
              <button
                type="submit"
                className="text-3xl text-white bg-base px-4 py-2 hover:bg-base/30 hover:text-base transition-all duration-300"
              >
                Register
              </button>
            </div>

            <p className="text-black/70 text-center text-2xl mt-14 mb-8">
              Already have an account?{" "}
              <Link to={"/login"} className="text-base">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
