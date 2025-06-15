import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {createWord} from "../redux/vocabs/vocabOps.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ukranian from '../../src/assets/ukraine.svg'
import english from '../../src/assets/english.svg'
export default function Wordsave() {
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
    const {word1,word2} =values;
    try {
      await dispatch(createWord({word1,word2}));
      resetForm(); // başarılıysa formu temizle
      toast.success("Word is added.")
    } catch (error) {
      console.error("Word creation failed", error);
    }
  };
  
  return (
    <div className="bg-[#85AA9F] rounded-3xl p-12">
      <Formik
        initialValues={{
          word1: "",
          word2: "",
        }}
        validationSchema={validationForm}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="flex flex-col gap-4">
            <div className="mb-2 flex flex-col gap-5">
              <div className="flex flex-row items-start">
                <Field
                  name="word1"
                  type="text"
                  className="w-65 textWhite border border-white/40 rounded-xl p-2"
                  placeholder="word2"
                />

                <div className="rounded-xl ml-2 mt-2 flex flex-row gap-2">
                  <img src={ukranian} alt="ukranian" className="h-7 w-7" />
                  <p className="textWhite">Ukrainian</p>
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
                  className=" w-65 textWhite border border-white/40 rounded-xl  p-2"
                  placeholder="word2" 
                />
                <div className="rounded-xl ml-2 mt-2 flex flex-row gap-2">
                  <img src={english} alt="english" className="h-7 w-7" />
                                  <p className="textWhite">English</p>

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
              className="border border-white/40 rounded-2xl w-full p-2 bg-white font-semibold ">
                Save
              </button>
              <button
              type="button" className="border border-white/40 rounded-2xl w-full p-2 textWhite  font-semibold ">
                Cancel
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
