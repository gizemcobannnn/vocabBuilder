import React, { useEffect, useState } from "react";
import craft from "../assets/Craftwork.svg";
import user from "../assets/gridicons_user.svg";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";
import { logoutUser, getUser } from "../redux/auth/authOps";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setAuthToken } from "../api/axios";

export default function Header() {
  const isLoggedOut = useSelector((state) => state.auth.isLoggedOut);
  const token = localStorage.getItem("token");
  const [userName, setUser] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setAuthToken(token);
    const fetchUserName = async () => {
      try {
        const user = await dispatch(getUser()).unwrap();
        setUser(user || "");
      } catch (e) {
        console.error("Failed to fetch user", e);
      }
    };
    if (isLoggedOut || !token) {
      navigate("/login");
    } else {
      fetchUserName();
    }
  }, [token, navigate, isLoggedOut, dispatch]);
  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success("Logged out");
    } catch (e) {
      toast.error("Logout failed: " + e.message);
    }
  };
  return (
    <div className="fixed top-0 right-0 z-50 flex flex-row justify-around items-center  p-2 w-full">
      <div className="flex flex-row gap-2 items-center">
        <img src={craft} alt="craf" />
        <p>VocabBuilder</p>
      </div>
      <nav className="flex flex-row gap-4 items-center text-[#121417] font-semibold">
        <NavLink to="/dictionary">Dictionary</NavLink>
        <NavLink to="/recommend">Recommend</NavLink>
        <NavLink to="/training">Training</NavLink>
      </nav>
      <div className="flex flex-row gap-2 items-center">
        <p>{userName.name}</p>
        <div className="w-10 h-10 rounded-full bg-[#85AA9F] flex justify-center items-center">
          <img src={user} alt="user" />
        </div>
        <div className="flex flex-row gap-2 items-center  px-4 py-2 font-semibold">
          {token && (
            <div className="flex flex-row gap-1 items-center  px-4 py-2 font-semibold">
              <button onClick={handleLogout}>Logout</button>
              <FaArrowRight className="text-[12px]" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
