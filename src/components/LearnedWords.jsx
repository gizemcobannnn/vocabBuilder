import noWord from "../assets/blood-report.svg";

export default function LearnedWords() {
  return (
    <div className="flex flex-row justify-between items-center  rounded-3xl p-12 gap-8">
      <div className="w-150 flex items-start flex-col gap-8">
        <h2 className="font-semibold text-xl">
          You don't have a single word to learn right now.{" "}
        </h2>
        <p className="text-[16px] text-justify">
          Please create or add a word to start the workout. We want to improve
          your vocabulary and develop your knowledge, so please share the words
          you are interested in adding to your study.
        </p>
        <div className="flex flex-row gap-5">
          <button className="colorfulButton w-40 h-12">
            Add Word
          </button>
          <button className="whiteButton rounded-3xl p-3 w-40 h-12">Cancel</button>
        </div>
      </div>
      <div>
        <img src={noWord} alt="No words" className="w-66 h-66" />
      </div>
    </div>
  );
}
