import React from "react";
import craft from "../assets/Craftwork.svg";
import user from "../assets/gridicons_user.svg";
import { NavLink } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Header() {
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
      <div className="flex flex-row gap-4 items-center">
        <p>namw</p>
        <div className="w-10 h-10 rounded-full bg-[#85AA9F] flex justify-center items-center">
          <img src={user} alt="user" />
        </div>
        <div className="flex flex-row gap-2 items-center  px-4 py-2 font-semibold">
          <button>Logout</button>
          <FaLongArrowAltRight className="text-[12px]" />
        </div>
      </div>
    </div>
  );
}
