import { useState } from "react";
import { createPortal } from "react-dom";
import ukrainian from "../../src/assets/ukraine.svg";
import english from "../../src/assets/english.svg";
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik";


export default function AddWord({closeModal}) {
  const [selectedWordType, setselectedWordType] = useState("");
  const [selectedCategory, setselectedCategory] = useState("");
  const handleSelect = (e) => {
    setselectedWordType(e.target.value);
  };
  const handleCategory = (e) => {
    setselectedCategory(e.target.value);
  };
const handleSubmit=()=>{

}
    const validationForm = Yup.object().shape({
      word1: Yup.string()
        .min(2, "Word must be 2 characters or more")
        .required("Required"),
      word2: Yup.string()
        .min(2, "Word must be 2 characters or more")
        .required("Required"),
    });

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col items-start bg-[#85AA9F] rounded-3xl w-150 relative">
      <button className="text-white text-2xl absolute top-4 right-6" onClick={closeModal}>X</button>
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
      <div className="flex flex-col gap-5 pl-12 pt-12 pr-12 items-start mb-12">
                <Formik
                  initialValues={{ word1: "", word2: "" }}
                  validationSchema={validationForm}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting, resetForm }) => (
                    <Form>
                      <div className="flex flex-col gap-4 ">
                        <div className="mb-2 flex flex-col gap-5">
                          <div className="flex flex-row items-start">
                            <Field
                              name="word1"
                              type="text"
                              className="w-65 text-white border border-white/40 rounded-xl p-2"
                              placeholder="Word"
                            />
                            <div className="rounded-xl ml-2 mt-2 flex flex-row gap-2">
                              <img
                                src={ukrainian}
                                alt="ukrainian"
                                className="h-7 w-7"
                              />
                              <p className="text-white">Ukrainian</p>
                            </div>
                          </div>
                          <ErrorMessage
                            name="word1"
                            component="div"
                            className="text-red-600 text-sm"
                          />
                        </div>
        
                        <div className="mb-2">
                          <div className="flex flex-row items-start">
                            <Field
                              name="word2"
                              type="text"
                              className="w-65 text-white border border-white/40 rounded-xl p-2"
                              placeholder="Word"
                            />
                            <div className="rounded-xl ml-2 mt-2 flex flex-row gap-2">
                              <img src={english} alt="english" className="h-7 w-7" />
                              <p className="text-white">English</p>
                            </div>
                          </div>
                          <ErrorMessage
                            name="word2"
                            component="div"
                            className="text-red-600 text-sm"
                          />
                        </div>
        
                        <div className="flex flex-row justify-around gap-4">
                          <button
                            type="submit"
                            className="border border-white/40 rounded-2xl w-full p-2 bg-white font-semibold"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? "Saving..." : "Save"}
                          </button>
        
                          <button
                            type="button"
                            onClick={() => resetForm()}
                            className="border border-white/40 rounded-2xl w-full p-2 text-white font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
      </div>
    </div>
</div>,document.body
  );
}
