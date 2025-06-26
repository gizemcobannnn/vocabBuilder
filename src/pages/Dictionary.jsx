import { BsSearch } from "react-icons/bs";
import english from "../assets/english.svg";
import ukrainian from "../assets/ukraine.svg";
import { useEffect, useState } from "react";
import Wordsave from "../components/Wordsave";
import Welldone from "../components/Welldone";
import { getWords, deleteWord } from "../redux/vocabs/vocabOps";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../api/axios";
import { toast } from "react-toastify";
import AddWord from "../components/AddWord";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Dictionary() {
  const [selectedWordType, setSelectedWordType] = useState("verb");
  const [selectedIsRegular, setSelectedIsRegular] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [words, setWords] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const [selectedWord, setSelectedWord] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = useSelector((state) => state.auth.token);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const navigate = useNavigate();
  const [totalTaskCount, setTotalTaskCount] = useState(0);

  const handleSelect = (e) => {
    setSelectedWordType(e.target.value);
  };
  const handlePage = async (page) => {
    setCurrentPage(page);
    const response = await dispatch(
      getWords({
        keyword: searchTerm,
        category: selectedWordType,
        isIrregular: selectedIsRegular,
        page: page,
        limit: 7,
      })
    ).unwrap();
    setTotalPage(response.totalPages);
  };
  useEffect(() => {
    const fetchWords = async () => {
      try {
        setAuthToken(token);
        const words = await dispatch(
          getWords({
            keyword: searchTerm || "",
            category: selectedWordType || "noun",
            isIrregular: selectedIsRegular || true,
            page: currentPage,
            limit: 7,
          })
        ).unwrap();
        console.log("Fetched words:", words);

        setWords(words.results);
        setCurrentPage(currentPage);
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("You are unauthorized. Please log in.");
          navigate("/login");
        } else {
          toast.error("An error occurred while fetching words.");
        }
      }
    };
    if (token) {
      fetchWords();
    }
  }, [
    dispatch,
    currentPage,
    token,
    navigate,
    searchTerm,
    selectedWordType,
    selectedIsRegular,
  ]);

  useEffect(() => {
    if (!token) {
      toast.info("Please login before view the page");
      navigate("/login", { replace: true });
    } else {
      const storedTaskCount = JSON.parse(localStorage.getItem("totalTaskNum"));
      if (storedTaskCount) {
        setTotalTaskCount(storedTaskCount);
      }
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteWord(id)).unwrap();

      const updatedWords = await dispatch(
        getWords({
          keyword: searchTerm,
          category: selectedWordType,
          isIrregular: selectedIsRegular,
          page: currentPage,
          limit: 7,
        })
      ).unwrap();

      setSelectedWord(null);
      setIsEdit(false);
      setWords(updatedWords.results);
    } catch (error) {
      console.error("Error:", error.message || error);
      alert(error.message || "Deletion is failed.");
    }
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
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="font-semibold"
            >
              Add Word +
            </button>
            <button
              type="button"
              className="font-semibold"
              onClick={() => {
                navigate("/training", { replace: true });
              }}
            >
              Train oneself{" "}
            </button>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between ">
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
                <th className="border border-gray-300 px-4 py-2 text-left w-60 text-slate-700">
                  {totalTaskCount}
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
                  <tr key={word._id}>
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
                      {totalTaskCount}
                    </td>
                    <td className="border border-gray-300 p-2 text-center relative">
                      <button
                        onClick={() => {
                          setSelectedWord(word);
                          setIsEdit(true);
                          setSelectedIsRegular(word.isIrregular);
                          setOpenDropdownId(
                            openDropdownId === word._id ? null : word._id
                          );
                        }}
                      >
                        ...
                      </button>

                      {openDropdownId === word._id && (
                        <div className="absolute top-8 right-4 w-32 bg-white shadow-lg rounded p-2 flex flex-col gap-2 z-10">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedWord(word);
                              setIsEditModalOpen(true);
                            }}
                            className="text-blue-600 text-left"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(word._id)}
                            className="text-red-600 text-left"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-row gap-2 justify-center mt-5">
        <button
          className="pageButtons flex flex-row justify-center items-center"
          onClick={() => handlePage(1)}
        >
          <MdKeyboardDoubleArrowLeft />
        </button>

        <button
          className="pageButtons flex flex-row justify-center items-center"
          onClick={() => handlePage(Math.max(1, currentPage - 1))}
        >
          <MdNavigateBefore />
        </button>

        {[1, 2, 3].map((page) => (
          <button
            key={page}
            className={`pageButtons ${
              currentPage === page ? "bg-[#85AA9F] text-white" : ""
            }`}
            onClick={() => handlePage(page)}
          >
            {page}
          </button>
        ))}

        <button className="pageButtons" disabled>
          ...
        </button>

        {/* Son 2 Sayfa */}
        {totalPage > 3 && (
          <>
            <button
              className={`pageButtons ${
                currentPage === totalPage - 1 ? "bg-[#85AA9F] text-white" : ""
              }`}
              onClick={() => handlePage(totalPage - 1)}
            >
              {totalPage - 1}
            </button>
            <button
              className={`pageButtons ${
                currentPage === totalPage ? "bg-[#85AA9F] text-white" : ""
              }`}
              onClick={() => handlePage(totalPage)}
            >
              {totalPage}
            </button>
          </>
        )}

        {/* Next Page */}
        <button
          className="pageButtons flex flex-row justify-center items-center"
          onClick={() => handlePage(Math.min(totalPage, currentPage + 1))}
        >
          <MdNavigateNext />
        </button>

        {/* Last Page */}
        <button
          className="pageButtons flex flex-row justify-center items-center"
          onClick={() => handlePage(totalPage)}
        >
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>

      {isModalOpen && <AddWord closeModal={() => setIsModalOpen(false)} />}

      {isEditModalOpen && selectedWord && (
        <Wordsave
          id={selectedWord._id}
          payload={{
            ua: selectedWord?.ua,
            en: selectedWord?.en,
            category: selectedWord?.category,
            isIrregular: selectedWord?.isIrregular,
          }}
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
