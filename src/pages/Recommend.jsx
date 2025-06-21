import { BsSearch } from "react-icons/bs";
import english from "../assets/english.svg";
import ukrainian from "../assets/ukraine.svg";
import { FaArrowRight } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOwnWord } from "../redux/vocabs/vocabOps";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setToken } from "../redux/auth/authSlice";
export default function Recommend() {
  const [selectedWordType, setSelectedWordType] = useState("Verb");
  const [selectedCategory, setselectedCategory] = useState("regular");
  const [recommendedWords,setrecommendedWords] = useState([]);
  const token = useSelector(state=>state.auth.token);
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const handleWordTypeChange = (e) => {
    setSelectedWordType(e.target.value);
  }

  const handleCategoryChange = (e) => {
    setselectedCategory(e.target.value); 
  }


  useEffect(() => {
    setToken(token);
    const fetchRecommendedWords = async () => {
      try {
        const response = await dispatch(getOwnWord()).unwrap();
        setrecommendedWords(response.results); // Eğer API'nin response'u buysa
      } catch (e) {
        if (e.response?.status === 401) {
          toast.error("You are unauthorized. Please log in.");
          navigate("/login");
        } else {
          toast.error("An error occurred while fetching words.");
        }
      }
    };

    if (token) {
      fetchRecommendedWords();
    }
    else{
      toast.info("Please login before view the page")
    }
  }, [token, dispatch, navigate]);

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
            onChange={handleWordTypeChange}
            value={ selectedWordType}
          >
            <option value="Verb">Verb</option>
          </select>
          <div className="flex flex-row gap-4 items-center justify-center ">
            <label htmlFor="regular">
              <input id="regular" type="radio" value="regular" 
              onChange={handleCategoryChange}
              checked={selectedCategory === "regular"} /> Regular
            </label>
            <label htmlFor="irregular">
              <input id="irregular" type="radio" value="irregular" 
              onChange={handleCategoryChange}
              checked={selectedCategory==="irregular"}/> Irregular
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
            {recommendedWords.length === 0 && (
  <tr>
    <td className="px-4 py-2 text-center" colSpan={4}>No results</td>
  </tr>
)}
            {recommendedWords.length>0  && (recommendedWords.map(word=>(
            <tr key={word.id}>
              <td className="border border-gray-300 px-4 py-2">{word.en}</td>
              <td className="border border-gray-300 px-4 py-2">{word.ua}</td>
              <td className="border border-gray-300 px-4 py-2">{word.category}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button className="text-slate-600">
                  Add to dictionary
                  <FaArrowRight className="inline-block ml-1 text-[12px]" />
                </button>
              </td>
            </tr>)
            ))}

          </tbody>
        </table>
      </div>
    </>
  );
}
