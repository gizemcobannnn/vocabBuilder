import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createWord } from "../redux/vocabs/vocabOps.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ukrainian from '../../src/assets/ukraine.svg';
import english from '../../src/assets/english.svg';
import { createPortal } from "react-dom";

export default function Wordsave({closeModal}) {
  const dispatch = useDispatch();

  const validationForm = Yup.object().shape({
    word1: Yup.string()
      .min(2, "Word must be 2 characters or more")
      .required("Required"),
    word2: Yup.string()
      .min(2, "Word must be 2 characters or more")
      .required("Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { word1, word2 } = values;
    try {
      await dispatch(createWord({ en:word1, ua:word2 })).unwrap();
      resetForm();
      toast.success("Word is added.");
    } catch (error) {
      console.error("Word creation failed", error);
      toast.error("Failed to add word.");
    }
  };

  return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

    <div className="bg-[#85AA9F] rounded-3xl p-12">
      <Formik
        initialValues={{ word1: "", word2: "" }}
        validationSchema={validationForm}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, resetForm }) => (
          <Form>
            <div className="flex flex-col gap-4">
              <button onClick={closeModal}>X</button>
              <div className="mb-2 flex flex-col gap-5">
                <div className="flex flex-row items-start">
                  <Field
                    name="word1"
                    type="text"
                    className="w-65 text-white border border-white/40 rounded-xl p-2"
                    placeholder="Word"
                  />
                  <div className="rounded-xl ml-2 mt-2 flex flex-row gap-2">
                    <img src={ukrainian} alt="ukrainian" className="h-7 w-7" />
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
                    name="word1"
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
    </div>, document.body
  );
}
