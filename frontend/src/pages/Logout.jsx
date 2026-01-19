import React, { useEffect } from "react";
import { useStore } from "../context/Context-Hook";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { userLogout } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    userLogout();
    navigate("/login");
  }, []);
  return <></>;
};

export default Logout;
