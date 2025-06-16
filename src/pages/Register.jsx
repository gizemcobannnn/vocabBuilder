import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import formImage from "../assets/illustration.svg";
import { BiShow, BiHide } from "react-icons/bi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../redux/auth/authOps";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      .min(6, "Password must be at least 6 characters")
      .max(15, "Password must be at most 15 characters")
      .required("Required"),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, action) => {
    try {
      const { name, email, password } = values;
      console.log("Form submitted with values:", name, email, password);
      const user = await dispatch(
        registerUser({ name, email, password })
      ).unwrap();
      console.log(user);
      action.resetForm();
      setTimeout(() => navigate("/recommend", { replace: true }), 0);
      toast.success("Registration is successful");
    } catch (e) {
      toast.error("Registration is failed: ", e);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center min-w-[400px] md:flex-row md:min-w-[720px] gap-10 md:gap-20 mt-15">
      <div className="bg-[#85AA9F]/10 max-w-sm md:min-w-[400px] lg:max-w-lg w-full pt-8 pr-15 pl-15 pb-8 rounded-4xl">
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
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-3">
              <div className="gap-3 flex flex-col">
                <Field
                  name="name"
                  placeholder="Name"
                  className="border border-[#121417]/10 p-3 rounded-xl"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="gap-3 flex flex-col">
                <Field
                  name="email"
                  placeholder="Email"
                  className="border border-[#121417]/10 p-3 rounded-xl"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="errorMessages"
                />
              </div>
              <div className="gap-3 flex flex-col relative">
                <Field
                  name="password"
                  placeholder="Password"
                  className="border border-[#121417]/10 p-3 rounded-xl"
                  type={showPassword ? "text" : "password"}
                ></Field>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-500"
                >
                  {showPassword ? (
                    <BiShow className="text-black" />
                  ) : (
                    <BiHide className="text-black" />
                  )}
                </button>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="errorMessages"
                />
              </div>
              <div className="flex flex-col mt-3 font-semibold">
                <button
                  type="submit"
                  className="colorfulButton w-full h-13 rounded-2xl"
                >
                  {isSubmitting ? "Registering" : "Register"}
                </button>
                <button
                  type="button"
                  className="border-none underline text-[#85AA9F] w-full h-13 rounded-2xl"
                  onClick={() => navigate("/login", { replace: true })}
                >
                  Login
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="flex rounded-2xl w-full  md:min-w-[300px] md:max-w-[400px] lg:min-w-[400px] lg:max-w-[600px] bg-gray-100 h-[300px] overflow-hidden">
        <img
          src={formImage}
          alt="formImage"
          className="w-full object-contain"
        />
      </div>
    </div>
  );
}
