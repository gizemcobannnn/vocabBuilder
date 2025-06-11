import { BsSearch } from "react-icons/bs";

export default function Dictionary() {
  return (
    <div>
      <div className="flex flex-row items-center justify-between w-300">
        <div className="flex flex-row rounded-3xl w-150 p-12 items-center gap-3">
          <div className="flex flex-row items-center border border-[#121417]/10 rounded-lg p-1">
            <input type="text" placeholder="Find the word " className="w-36" />
            <BsSearch />
          </div>
          <select name="wordType" id="wordType">
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
        <div className="flex flex-row gap-2">
          <p>To study: </p>
          <p>Train oneself </p>
        </div>
      </div>
    </div>
  );
}
