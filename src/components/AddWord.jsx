import { useState } from "react";
import { createPortal } from "react-dom";
import ukrainian from "../../src/assets/ukraine.svg";
import english from "../../src/assets/english.svg";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { createWord } from "../redux/vocabs/vocabOps";
import { toast } from "react-toastify";

export default function AddWord({ closeModal }) {
  const [selectedWordType, setSelectedWordType] = useState("verb");
  const [selectedIsRegular, setSelectedIsRegular] = useState(true);
  const dispatch = useDispatch();

  const validationForm = Yup.object().shape({
    word1: Yup.string()
      .min(2, "Word must be 2 characters or more")
      .required("Required"),
    word2: Yup.string()
      .min(2, "Word must be 2 characters or more")
      .required("Required"),
  });

  const handleSelect = (e) => {
    setSelectedWordType(e.target.value);
  };

  const handleRegularity = (e) => {
    setSelectedIsRegular(e.target.value === "regular");
  };

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      await dispatch(
        createWord({ data: values, selectedWordType, selectedIsRegular })
      ).unwrap();
      toast.success("Word saved successfully!");
      resetForm();
      closeModal();
    } catch (e) {
      toast.error("Word did not save: " + e.message);
    }
    setSubmitting(false);
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col items-start bg-[#85AA9F] rounded-3xl w-150 relative p-12">
        <button
          className="text-white text-2xl absolute top-4 right-6"
          onClick={closeModal}
        >
          X
        </button>

        <h2 className="font-bold text-white text-3xl mb-4">Add Word</h2>
        <p className="text-white text-lg mb-6">
          Adding a new word to the dictionary is an important step in enriching
          the language base and expanding the vocabulary.
        </p>

        <select
          name="wordtype"
          className="text-white bg-[#85AA9F] border border-white/40 rounded-xl p-2 w-40 mb-4"
          onChange={handleSelect}
          value={selectedWordType}
        >
          <option value="verb">Verb</option>
          <option value="participle">Participle</option>
          <option value="noun">Noun</option>
          <option value="pronoun">Pronoun</option>
          <option value="numerals">Numerals</option>
          <option value="adverb">Adverb</option>
        </select>

        <div className="flex gap-4 mb-6 text-white">
          <label>
            <input
              type="radio"
              name="wordCategory"
              value="regular"
              checked={selectedIsRegular === true}
              onChange={handleRegularity}
            />{" "}
            Regular
          </label>
          <label>
            <input
              type="radio"
              name="wordCategory"
              value="irregular"
              checked={selectedIsRegular === false}
              onChange={handleRegularity}
            />{" "}
            Irregular
          </label>
        </div>

        <Formik
          initialValues={{ word1: "", word2: "" }}
          validationSchema={validationForm}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, resetForm }) => (
            <Form className="flex flex-col gap-5 w-full">
              <div>
                <div className="flex items-center mb-2 w-100">
                  <Field
                    name="word1"
                    type="text"
                    className="flex-1 text-white border border-white/40 rounded-xl p-2 "
                    placeholder="Word"
                  />
                  <div className="flex items-center gap-2 ml-2">
                    <img src={ukrainian} alt="ukrainian" className="h-7 w-7" />
                    <span className="text-white">Ukrainian</span>
                  </div>
                </div>
                <ErrorMessage
                  name="word1"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div>
                <div className="flex items-center mb-2 w-100">
                  <Field
                    name="word2"
                    type="text"
                    className="flex-1 text-white border border-white/40 rounded-xl p-2"
                    placeholder="Word"
                  />
                  <div className="flex items-center gap-2 ml-2">
                    <img src={english} alt="english" className="h-7 w-7" />
                    <span className="text-white">English</span>
                  </div>
                </div>
                <ErrorMessage
                  name="word2"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="border border-white/40 rounded-2xl flex-1 p-2 bg-white font-semibold"
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    closeModal();
                  }}
                  className="border border-white/40 rounded-2xl flex-1 p-2 text-white font-semibold"
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>,
    document.body
  );
}
