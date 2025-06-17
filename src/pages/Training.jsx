import ukrainian from "../assets/ukraine.svg";
import english from "../assets/english.svg";
import { useState } from "react";
import Welldone from "../components/Welldone";
export default function Training() {
  const [isModalOpen,setIsModalOpen]=useState(false);
  return (
    <>
      <div className="grid grid-cols-2 gap-0 p-5 bg-[#FCFCFC] rounded-3xl">
        <div className="flex flex-col items-start justify-center gap-0 bg-[#FCFCFC]">
          <div className="flex flex-row justify-between w-[400px] h-[200px] border  border-white border-r-[#DBDBDB] p-5">
            <input className="" placeholder="UK"></input>
            <div className="flex flex-row items-start justify-around gap-2 p-4">
              <img src={ukrainian} alt="ukrainian" />
              <p>Ukrainian</p>
            </div>
                      

          </div>
           <button className="flex text-[#121417]/50">Next</button>
          
        </div>
          <div className="flex flex-row justify-between w-[400px] h-[200px] border border-white border-l-[#DBDBDB] p-5">
          <input className="" placeholder="EN"></input>
            <div className="flex flex-row items-start justify-around gap-2 p-4">
              <img src={english} alt="english" />
              <p>English</p>
            </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-10 mt-10">
        <button className="colorfulButton" onClick={()=>setIsModalOpen(true)}>Save</button>
        <button className="colorfulButton">Cancel</button>
      </div>
      {isModalOpen && (
        <Welldone closeModal={()=>setIsModalOpen(false)} />
      )}
    </>
  );
}
