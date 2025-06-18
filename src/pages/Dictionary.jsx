import { BsSearch } from "react-icons/bs";
import english from "../assets/english.svg";
import ukrainian from "../assets/ukraine.svg";
import { useEffect, useState } from "react";
import Wordsave from "../components/Wordsave";
import Welldone from "../components/Welldone";
import { getWords, deleteWord } from "../redux/vocabs/vocabOps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Dictionary() {
  const [selectedWordType, setSelectedWordType] = useState("verb");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [words, setWords] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [selectedWord, setSelectedWord] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = useSelector(state=>state.auth.token);
  const [currentPage,setCurrentPage]=useState(1);
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn)
  
  const navigate =  useNavigate();
  useEffect(()=>{
      if(!token && !isLoggedIn){
          navigate('/recommend', { replace: true });

  }
  },[token, navigate])
  const handleSelect = (e) => {
    setSelectedWordType(e.target.value);
  };
 const handlePage=async(page)=>{
  setCurrentPage(page);
  await dispatch(getWords({keyword:searchTerm,category:selectedWordType,isRegular:true,page:page,limit:7})).unwrap();

 }
  useEffect(() => {
    const fetchWords = async () => {
      const words = await dispatch(getWords({keyword:searchTerm,category:selectedWordType,isRegular:true,page:currentPage,limit:7})).unwrap();
      setWords(words.results);
    };
    fetchWords();
  }, [dispatch,currentPage]);

  const handleDelete = async(id) => {
    await dispatch(deleteWord(id)).unwrap(); 
  const updatedWords = await dispatch(getWords()).unwrap(); 
    setSelectedWord(null);
    setIsEdit(false);
      setWords(updatedWords);

  };

  return (
    <>
      <div>
        <div className="flex flex-row items-center justify-between w-300">
          <div className="flex flex-row rounded-3xl w-150 p-12 items-center gap-3">
            <div className="flex flex-row items-center border border-[#121417]/10 rounded-lg p-1">
              <input
                type="text"
                placeholder="Find the word "
                className="w-36"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <BsSearch />
            </div>
            <select
              name="wordType"
              id="wordType"
              onChange={handleSelect}
              value={selectedWordType}
            >
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="font-semibold"
            >
              Add Word +
            </button>
            <p className="font-semibold">Train oneself </p>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-[#85AA9F]/10">
                <th className="border border-gray-300 px-4 py-2 text-left w-80">
                  <div className="flex flex-row justify-between items-center gap-2">
                    <p>Word</p>
                    <img src={english} alt="english" />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left w-80">
                  <div className="flex flex-row justify-between items-center gap-2">
                    <p>Translation</p>
                    <img src={ukrainian} alt="ukrainian" />
                  </div>
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left w-60">
                  Category
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left w-60">
                  Progress
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left w-20"></th>
              </tr>
            </thead>
            <tbody className="text-left">
              {words
                .filter((word) =>
                  word.en.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((word) => (
                  <tr key={word.id}>
                    <td className="border border-gray-300 px-4 py-2">
                      {word.en}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {word.ua}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {word.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      progress
                    </td>
                    <td className="border border-gray-300 p-2 text-center">
                      <button
                        onClick={() => {
                          setSelectedWord(word);
                          setIsEdit(true);
                        }}
                      >
                        ...
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className=" flex flex-row gap-2 justify-center mt-5">
        <button className="pageButtons" onClick={()=>handlePage}> </button>
        <button className="pageButtons" onClick={()=>handlePage}> </button>
        <button className="pageButtons" onClick={()=>handlePage(1)}>1</button>
        <button className="pageButtons" onClick={()=>handlePage(2)}>2</button>
        <button className="pageButtons" onClick={()=>handlePage(3)}>3</button>
        <button className="pageButtons" onClick={()=>handlePage(4)}>4</button>
        <button className="pageButtons" onClick={()=>handlePage(5)}>5</button>
        <button className="pageButtons" onClick={()=>handlePage(6)}>6</button>
        <button className="pageButtons" onClick={()=>handlePage(7)}>7</button>
        <button className="pageButtons" onClick={()=>handlePage(8)}>8</button>
        <button className="pageButtons" onClick={()=>handlePage(9)}>9</button>
        <button className="pageButtons" onClick={()=>handlePage(10)}>10</button>
        <button className="pageButtons" onClick={()=>handlePage}></button>
        <button className="pageButtons" onClick={()=>handlePage}></button>
      </div>

      {isModalOpen && <Welldone closeModal={() => setIsModalOpen(false)} />}

      {selectedWord && isEdit && (
        <div className="w-full flex flex-col p-3 gap-2">
          <button
            type="button"
            onClick={() => setIsEditModalOpen(true)}
            className="text-blue-600"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => handleDelete(selectedWord.id)}
            className="text-red-600"
          >
            Delete
          </button>
        </div>
      )}

      {isEditModalOpen && selectedWord && (
        <Wordsave
          category={selectedWord.category}
          isIrregular={selectedWord.isRegular}
          closeModal={() => {
            setIsEditModalOpen(false);
            setIsEdit(false);
            setSelectedWord(null);
          }}
        />
      )}
    </>
  );
}
