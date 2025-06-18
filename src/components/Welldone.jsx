import React from "react";
import book from "../assets/book.svg";
import { createPortal } from "react-dom";
export default function Welldone({ closeModal ,tasks=[]}) {
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="relative flex flex-col items-center justify-start w-[530px] h-[520px] bg-[#85AA9F] rounded-3xl p-10 ">
        <button
          type="button"
          onClick={closeModal}
          className="text-white text-2xl absolute top-3 right-5"
        >
          X
        </button>

        <h1 className="text-2xl text-white font-semibold mt-2 mb-6">
          Well done
        </h1>

        <div className="grid grid-cols-2 gap-5 w-full">
          <div className="flex flex-col items-center justify-center ">
            <h2 className="text-white">Correct answers</h2>
            <ul className="flex flex-col gap-1">
              {tasks.lenght>0 && tasks.map(task=>(
                <li key={task._id}>{task.task}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <h2 className="text-white ">Mistakes</h2>
            <ul className="flex flex-col gap-1"></ul>
          </div>
        </div>
        <div className="absolute bottom-5 right-0">
          <img src={book} alt="book" />
        </div>
      </div>
    </div>,
    document.body
  );
}
