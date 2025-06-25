/* eslint-disable no-unused-vars */
import ukrainian from "../assets/ukraine.svg";
import english from "../assets/english.svg";
import { useState, useEffect } from "react";
import Welldone from "../components/Welldone";
import { getTasks, createAnswer } from "../redux/vocabs/vocabOps";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import generateObjectId from "../utils/generateObjectId";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import LearnedWords from "../components/LearnedWords";
import { useNavigate } from "react-router-dom";
import Dictionary from "./Dictionary";

export default function Training() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [ua, setUa] = useState("");
  const [en, setEn] = useState("");
  const [tasks, setTasks] = useState([]);
  const id = generateObjectId();
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [taskNum, setTaskNum] = useState(0);
  const [totalTask,setTotalTask]=useState(0);

  useEffect(() => {
    if (!token) {
      toast.info("Please login before viewing the page");
      navigate("/login", { replace: true });
    }
  }, [token]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksResponse = await dispatch(getTasks()).unwrap();
        setTasks(tasksResponse.tasks || []);
        setUa(tasksResponse.tasks[0].ua || "")
        setUa(tasksResponse.tasks[0].en || "")
        setTotalTask(tasksResponse.tasks.length);
      } catch (e) {
        toast.error("Tasks could not be fetched: " + e);
      } finally {
        setIsLoading(false);
      }
    };
    if (token) {
      fetchTasks();
    }
  }, [dispatch, token]);

  const handleSave = async () => {
    if (ua === "" || en === "") return;

    try {
      const answerData = { _id: id.toString(), en, ua, task: "en" };
      await dispatch(createAnswer(answerData)).unwrap();
      toast.success("Word is saved");
    } catch (e) {
      toast.error("Word is not saved");
    }
    setUa("");
    setEn("");

    if (taskNum < tasks.length - 1) {
      setTaskNum((prev) => prev + 1);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleCountdownComplete = () => {
    if (taskNum < tasks.length - 1) {
      setTaskNum((prev) => prev + 1);
      setUa(tasks[taskNum].ua);
      setEn(tasks[taskNum].en);
      console.log(ua,en)
      return { shouldRepeat: true, delay: 1 };
    } else {
      setIsModalOpen(true);
      return { shouldRepeat: false };
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (tasks.length === 0) return <LearnedWords totalTask={totalTask} />;

  const currentTask = tasks[taskNum];

  return (
    <>
      <div className="flex flex-col">
        {/* Timer */}
        <div className="flex flex-row self-end h-5 w-10 m-20">
          <CountdownCircleTimer
            isPlaying
            duration={25}
            colors={["#85AA9F"]}
            size={75}
            strokeWidth={7}
            onComplete={handleCountdownComplete}
          >
            {({ remainingTime }) => (
              <div className="flex items-center justify-center h-full w-full text-lg text-gray-800">
                {remainingTime}
              </div>
            )}
          </CountdownCircleTimer>
        </div>

        {/* Task Area */}
        <div className="grid grid-cols-2 gap-0 p-5 bg-[#FCFCFC] rounded-3xl">
          {/* Ukrainian input */}
          <div className="flex flex-col items-start justify-center gap-0 bg-[#FCFCFC]">
            <div className="flex flex-row justify-between items-start w-[400px] h-[200px] border border-white border-r-[#DBDBDB] p-6">
              <input
                className="inputword"
                placeholder="UK"
                value={ua}
                onChange={(e) => setUa(e.target.value)}
              /> 
              <div className="flex flex-row items-start justify-around gap-2">
                <img src={ukrainian} alt="ukrainian" />
                <p>Ukrainian</p>
              </div>
            </div>
            {/* Next button */}
            <button
              className="flex text-[#121417]/50 mt-4"
              onClick={handleSave}
              disabled={ua === "" || en === ""}
            >
              Next
            </button>
          </div>

          {/* English input */}
          <div className="flex flex-row justify-between items-start w-[400px] h-[200px] border border-white border-l-[#DBDBDB] p-6">
            <input
              className="inputword"
              placeholder="EN"
              value={en}
              onChange={(e) => setEn(e.target.value)}
            />
            <div className="flex flex-row items-start justify-around gap-2">
              <img src={english} alt="english" />
              <p>English</p>
            </div>
          </div>
        </div>

        {/* Save - Cancel buttons */}
        <div className="flex flex-row items-center gap-10 mt-10">
          <button
            className="colorfulButton w-40 h-10"
            onClick={handleSave}
            disabled={ua === "" || en === ""}
          >
            Save
          </button>
          <button className="colorfulButton w-40 h-10">Cancel</button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Welldone closeModal={() => setIsModalOpen(false)} tasks={tasks} />
      )}
    </>
  );
}
