import user from "../assets/gridicons_user.svg";
import { NavLink } from "react-router-dom";
import mainimg from "../assets/illustration.svg";
export default function SideMenu({onClose}) {
  return (
    <div>
      <div className="fixed top-0 right-0 z-50  h-screen w-64 bg-[#85AA9F] p-5">
        <div className="flex flex-row w-full items-center gap-4 relative">
          <p className="text-white font-semibold">Name</p>
          <div className="w-10  h-10 rounded-full bg-white flex justify-center items-center">
            <img src={user} alt="user" className="w-10 h-10" />
          </div>
          <button className="text-white  absolute top-2 right-2" onClick={onClose}>X</button>
        </div>

        <nav className="flex flex-col mt-20 gap-4 items-start">
          <NavLink to="/dictionary" className="text-white hover:underline">
            Dictionary
          </NavLink>
          <NavLink to="/recommend" className="text-white hover:underline">
            Recommend
          </NavLink>
          <NavLink to="/training" className="text-white hover:underline">
            Training
          </NavLink>
          <button className="bg-white text-[#85AA9F] font-semibold px-4 py-1 rounded-lg mt-4 hover:bg-gray-100">
            Logout
          </button>
        </nav>

        <img
          src={mainimg}
          alt="mainimg"
          className="absolute bottom-2 right-0 w-full  bg-cover"
        />
      </div>
    </div>
  );
}
