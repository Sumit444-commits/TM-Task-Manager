import { useEffect, useState } from "react";
import { StoreContext } from "./Store-Context";

export const StoreContextProvider = ({ children }) => {
  const api = import.meta.env.VITE_API;
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskLoader, setTaskLoader] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("userToken"));
  const [loading, setLoading] = useState(true);
  const authWithToken = `Bearer ${token}`;
  const isLoggedIn = !!token;
  const storeTokenInLS = (token) => {
    localStorage.setItem("userToken", token);
    setToken(token);
  };
  const isAuthenticated = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${api}/api/auth/user`, {
        method: "GET",
        headers: { Authorization: authWithToken },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        getTasks(data._id);
      }
      if (data.message === "Token Expired") {
        userLogout();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getTasks = async (id) => {
    try {
      setTaskLoader(true);
      const response = await fetch(`${api}/api/task/${id}`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTaskLoader(false);
    }
  };
  const addNewTask = async (data) => {
    try {
      const response = await fetch(`${api}/api/task/add/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        getTasks(user._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editTask = async (id, data) => {
    try {
      const response = await fetch(`${api}/api/task/edit/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        getTasks(user._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${api}/api/task/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        getTasks(user._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const userLogout = () => {
    localStorage.removeItem("userToken");
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    if (token || isLoggedIn) {
      isAuthenticated();
    }
  }, [isLoggedIn, token]);
  // useEffect(() => {
  //   isAuthenticated();
  // }, []);

  return (
    <StoreContext.Provider
      value={{
        api,
        storeTokenInLS,
        user,
        token,
        isAuthenticated,
        userLogout,
        isLoggedIn,
        loading,
        getTasks,
        tasks,
        taskLoader,
        addNewTask,
        editTask,
        deleteTask,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
