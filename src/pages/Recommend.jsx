import { BsSearch } from "react-icons/bs";
import english from "../assets/english.svg";
import ukrainian from "../assets/ukraine.svg";
import { FaArrowRight } from "react-icons/fa6";

export default function Recommend() {
  return (
    <>
      <div className="flex flex-row items-center justify-between w-300">
        <div className="flex flex-row rounded-3xl w-150 p-12 items-center gap-3">
          <div className="flex flex-row items-center border border-[#121417]/10 rounded-lg p-1">
            <input type="text" placeholder="Find the word " className="w-36" />
            <BsSearch />
          </div>
          <select
            name="selectword"
            id="selectword"
            className="border border-[#121417]/10 w-30 rounded-lg p-1"
          >
            <option value="Verb">Verb</option>
          </select>
          <div className="flex flex-row gap-4 items-center justify-center ">
            <label htmlFor="regular">
              <input id="regular" type="radio" /> Regular
            </label>
            <label htmlFor="irregular">
              <input id="irregular" type="radio" /> Irregular
            </label>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <p>To study: </p>
          <p>Train oneself </p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-300">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-[#85AA9F]/10">
              <th className="border border-gray-300 px-4 py-2 text-left">
                <div className="flex flex-row justify-between items-center gap-2">
                  <p>Word</p>
                  <img src={english} alt="english" />
                </div>
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                <div className="flex flex-row justify-between items-center gap-2">
                  <p>Translation</p>
                  <img src={ukrainian} alt="ukrainian" />
                </div>
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Category
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2">Gizem Genç</td>
              <td className="border border-gray-300 px-4 py-2">Translation</td>
              <td className="border border-gray-300 px-4 py-2">Verb</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="text-slate-600">
                  Add to dictionary
                  <FaArrowRight className="inline-block ml-1 text-[12px]" />
                </button>
              </td>{" "}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
