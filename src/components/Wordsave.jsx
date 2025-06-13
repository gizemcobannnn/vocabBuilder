import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import createWord from '../controllers/words/createWord';

export default function Wordsave() {
  const validationForm = Yup.object().shape({
    word1: Yup.string()
      .min(2, "Word must be 2 characters or more")
      .required("Required"),
    word2: Yup.string()
      .min(2, "Word must be 2 characters or more")
      .required("Required"),
  });

  const handleSubmit = async(values) => {
    console.log("Form submitted with values:", values);
    const createdWord = await createWord();
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
                />

                <div className="h-5 w-5 rounded-xl"></div>
                <p className="textWhite">Turkish</p>
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
                />
                <div className="h-5 w-5 rounded-xl"></div>
                <p className="textWhite">English</p>
              </div>
              <ErrorMessage
                name="word2"
                component="div"
                className="text-red-600 text-sm"
              />
            </div>
            <div className="flex flex-row justify-around gap-4">
              <button className="border border-white/40 rounded-2xl w-full p-2 bg-white font-semibold ">
                Save
              </button>
              <button className="border border-white/40 rounded-2xl w-full p-2 textWhite  font-semibold ">
                Cancel
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
