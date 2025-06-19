import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {  editWord } from "../redux/vocabs/vocabOps.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ukrainian from "../../src/assets/ukraine.svg";
import english from "../../src/assets/english.svg";
import { createPortal } from "react-dom";

export default function Wordsave({ id,payload,closeModal }) {
  const category = payload?.category || "";
  const isIrregular = payload?.isIrregular || false;
  const ua = payload?.ua || "";
  const en = payload?.en || "";
  const dispatch = useDispatch();
  console.log(`${id} and payload: ${payload.ua}`)

  const validationForm = Yup.object().shape({
    word1: Yup.string()
      .min(2, "Word must be 2 characters or more")
      .required("Required"),
    word2: Yup.string()
      .min(2, "Word must be 2 characters or more")
      .required("Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const { ua, en } = values;
    try {
      const updatedData={ua: ua, en: en ,category, isIrregular}
      await dispatch(editWord({id,updatedData})).unwrap();
      resetForm();
      toast.success("Word is added.");
    } catch (error) {
      toast.error("Failed to add word."+error);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-[#85AA9F] rounded-3xl p-12 absolute">
        <button
          onClick={closeModal}
          className="text-white absolute top-3 right-6"
        >
          X
        </button>

        <Formik
          initialValues={{ word1: ua, word2: en }}
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
                    onClick={() => {resetForm();closeModal()}}
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
    </div>,
    document.body
  );
}
