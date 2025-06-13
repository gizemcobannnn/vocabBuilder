import { useState } from "react";
import Wordsave from "./Wordsave";
export default function AddWord() {
  const [selectedWordType, setselectedWordType] = useState("");
  const [selectedCategory, setselectedCategory] = useState("");
  const handleSelect = (e) => {
    setselectedWordType(e.target.value);
  };
  const handleCategory = (e) => {
    setselectedCategory(e.target.value);
  };
  return (
    <div className="flex flex-col items-start bg-[#85AA9F] rounded-3xl w-150">
      <div className="flex flex-col gap-5 pl-12 pt-12 pr-12 items-start">
        <p className="font-bold text-white text-3xl">Add word</p>
        <p className="text-white text-[20px] text-justify">
          Adding a new word to the dictionary is an important step in enriching
          the language base and expanding the vocabulary.
        </p>
      </div>
      <div className="flex flex-col gap-5 pl-12 pt-12 pr-12 items-start">
        <select
          name="wordtype"
          id="wordtype"
          className="text-white bg-[#85AA9F] border border-white/40 rounded-xl p-2 w-40"
          onChange={handleSelect}
          valıue={selectedWordType}
        >
          <option value="Verb">Verb</option>
          <option value="Participle">Participle</option>
          <option value="Noun">Noun</option>
          <option value="Participle">Participle</option>
          <option value="Pronoun">Pronoun</option>
          <option value="Numerals">Numerals</option>
          <option value="Adverb">Adverb</option>
        </select>
        <div className="flex flex-row gap-4 items-center text-white">
          <label htmlFor="noun">
            <input
              type="radio"
              name="wordCategory"
              value="irregular"
              id="irregular"
              checked={selectedCategory === "irregular"}
              onChange={handleCategory}
            />{" "}
            Regular
          </label>
          <label htmlFor="adjective">
            <input
              type="radio"
              name="wordCategory"
              value="irregular"
              id="irregular"
              checked={selectedCategory === "irregular"}
              onChange={handleCategory}
            />{" "}
            Irregular
          </label>
        </div>
      </div>
      <Wordsave className="p-0" />
    </div>
  );
}
