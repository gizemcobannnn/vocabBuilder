import { BsSearch } from "react-icons/bs";
import english from "../assets/english.svg";
import ukrainian from "../assets/ukraine.svg";
import { FaArrowRight } from "react-icons/fa6";
import { useState } from "react";
import Wordsave from "../components/Wordsave";
import Welldone from "../components/Welldone";
export default function Dictionary() {
  const [selectedWordType, setSelectedWordType] = useState("verb");
  const [isModalOpen, setIsModalOpen]=useState(false);
  const handleSelect = (e) => {
    setSelectedWordType(e.target.value);
  };
  return (
<>
    <div>
      <div className="flex flex-row items-center justify-between w-300">
        <div className="flex flex-row rounded-3xl w-150 p-12 items-center gap-3">
          <div className="flex flex-row items-center border border-[#121417]/10 rounded-lg p-1">
            <input type="text" placeholder="Find the word " className="w-36" />
            <BsSearch />
          </div>
          <select name="wordType" id="wordType" onChange={handleSelect} value={selectedWordType} >
            <option value="verb">Verb</option>
            <option value="participle">Participle</option>
            <option value="noun">Noun</option>
            <option value="adjective">Adjective</option>
            <option value="pronoun">Pronoun</option>
            <option value="numerals">Numerals</option>
            <option value="adverb">Adverb</option>
            <option value="preposition">Preposition</option>
            <option value="conjunction">Conjunction</option>
            <option value="phrasalVerb">Phrasal verb</option>
            <option value="functionalPhrase">Functional phrase</option>
          </select>
        </div>
        <div className="flex flex-row gap-4">
          <p>To study: </p>
          <button onClick={()=>setIsModalOpen(true)} className="font-semibold">Add Word +</button>
          <p className="font-semibold">Train oneself </p>
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
                      <button className="text-slate-600" onClick={()=>setIsModalOpen(true)}>
                        Add to dictionary
                        <FaArrowRight className="inline-block ml-1 text-[12px]" />
                      </button>
                    </td>{" "}
                  </tr>
                </tbody>
              </table>
            </div>
    </div>
    {isModalOpen && (<Welldone closeModal={()=>setIsModalOpen(false)} />)}
</>
  );
}
