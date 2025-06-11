import ukrainian from "../assets/ukraine.svg";
import english from "../assets/english.svg";
export default function Training() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-12 bg-[#FCFCFC] rounded-3xl">
        <div className="flex flex-col items-start justify-between">
          <div className="flex flex-row justify-between w-[400px] h-[200px]">
            <input className=""></input>
            <div className="flex flex-row items-start justify-around gap-2 p-4">
              <img src={ukrainian} alt="ukrainian" />
              <p>Ukrainian</p>
            </div>
          </div>
          <button>Next</button>
        </div>
          <div className="flex flex-row justify-between w-[400px] h-[200px] ">
          <input className=""></input>
            <div className="flex flex-row items-start justify-around gap-2 p-4">
              <img src={english} alt="english" />
              <p>English</p>
            </div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-10">
        <button className="colorfulButton ">Save</button>
        <button className="colorfulButton">Cancel</button>
      </div>
    </>
  );
}
