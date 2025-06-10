import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import formImage from "../assets/illustration.svg";
export default function Register() {
  const validationRegister = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(15, "Name must be at most 15 characters")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email format")
      .min(9, "Email must be at least 9 characters")
      .max(50, "Email must be at most 50 characters")
      .required("Required"),
    password: Yup.string()
      .min(3, "Password must be at least 3 characters")
      .max(15, "Password must be at most 15 characters")
      .required("Required"),
  });

  const handleSubmit = (values, action) => {
    const { name, email, password } = values;
    console.log("Form submitted with values:", name, email, password);
    action.resetForm();
    // Here you would typically send the values to your backend for registration
  };
  return (
    <div className= "flex flex-row gap-20 items-start">
      <div className="bg-[#85AA9F]/10 max-w-md w-full p-6 rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-start">Register</h1>
        <p className="text-justify mb-4">
          To start using our services, please fill out the registration form
          below. All fields are mandatory:
        </p>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationRegister}
          onSubmit={handleSubmit}
        >
          <Form className="flex flex-col gap-3">
            <div className="gap-3 flex flex-col">
              <Field name="name" placeholder="Name" className="border border-[#121417]/10 p-3 rounded-xl" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              ></ErrorMessage>
            </div>
            <div className="gap-3 flex flex-col">
              <Field name="email" placeholder="Email" className="border border-[#121417]/10 p-3 rounded-xl"  />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              ></ErrorMessage>
            </div>
            <div className="gap-3 flex flex-col">
              <Field name="password" placeholder="Pasword" className="border border-[#121417]/10 p-3 rounded-xl"  />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              ></ErrorMessage>
            </div>
            <div className="flex flex-col mt-3 font-semibold">
              <button className="colorfulButton w-full h-13 rounded-2xl">Register</button>
              <button className="border-none underline text-[#85AA9F] w-full h-13 rounded-2xl">Login</button>
            </div>
          </Form>
        </Formik>
      </div>
      <div>
        <img src={formImage} alt="formImage" />
      </div>
    </div>
  );
}
