import ukrainian from "../assets/ukraine.svg";
import english from "../assets/english.svg";
import { useState } from "react";
import Welldone from "../components/Welldone";
import { useEffect } from "react";
import { getTasks, createAnswer } from "../redux/vocabs/vocabOps";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import generateObjectId from "../utils/generateObjectId";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import LearnedWords from "../components/LearnedWords";

export default function Training() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [ua, setua] = useState("");
  const [en, seten] = useState("");
  const [tasks, setTasks] = useState([]);
  const id = generateObjectId();
  const [isLoading, setIsLoading] = useState(true);

  const handleSave = async () => {
    setIsModalOpen(true);
    const answerData = { _id: id.toString(), en, ua, task: "en" };
    await dispatch(createAnswer(answerData)).unwrap();
    setTasks((prev) => [...prev, answerData]);
  };
  useEffect(() => {
    const getTask = async () => {
      try {
        const tasksResponse = await dispatch(getTasks()).unwrap();
        setTasks(tasksResponse.tasks.words || []);

      } catch (e) {
        toast.error("tasks did not fetched" + e);
      }finally{
        setIsLoading(false)
      }
    };
    getTask();
  },[]);
  return (
    <>
 {isLoading ? (
        <div>Loading...</div>
      ) : tasks?.length === 0 ? (
        <LearnedWords />
      ) :(
        <div className="flex flex-col">
        <div className="flex flex-row self-end h-5 w-10 m-20">
          <CountdownCircleTimer
            isPlaying
            duration={25}
            colors={["#85AA9F"]}
            size={75}
            strokeWidth={7}
            onComplete={() => {
              return { shouldRepeat: true, delay: 1 };
            }}
          >
            {({ remainingTime }) => (
              <div className="flex items-center justify-center h-full w-full text-lg text-gray-800">
                {remainingTime}
              </div>
            )}
          </CountdownCircleTimer>
        </div>

        <div className="grid grid-cols-2 gap-0 p-5 bg-[#FCFCFC] rounded-3xl">
          <div className="flex flex-col items-start justify-center gap-0 bg-[#FCFCFC]">
            <div className="flex flex-row justify-between items-start w-[400px] h-[200px] border  border-white border-r-[#DBDBDB] p-6">
              <input
                className="inputword"
                placeholder="UK"
                value={ua}
                onChange={(e) => setua(e.target.value)}
              ></input>
              <div className="flex flex-row items-start justify-around gap-2">
                <img src={ukrainian} alt="ukrainian" />
                <p>Ukrainian</p>
              </div>
            </div>
            <button className="flex text-[#121417]/50">Next</button>
          </div>
          <div className="flex flex-row justify-between items-start w-[400px] h-[200px] border border-white border-l-[#DBDBDB] p-6">
            <input
              className="inputword"
              placeholder="EN"
              value={en}
              onChange={(e) => seten(e.target.value)}
            ></input>
            <div className="flex flex-row items-start justify-around gap-2">
              <img src={english} alt="english" />
              <p>English</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-10 mt-10">
          <button
            className="colorfulButton"
            onClick={handleSave}
            disabled={ua === "" || en === ""}
          >
            Save
          </button>
          <button className="colorfulButton">Cancel</button>
        </div>
      </div>)}
      {isModalOpen && (
        <Welldone closeModal={() => setIsModalOpen(false)} tasks={tasks} />
      )}
    </>
  );

}