import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import formImage from "../assets/illustration.svg";
import { BiShow, BiHide } from "react-icons/bi";
import { useState, useEffect } from "react";
import { loginUser } from "../redux/auth/authOps.js";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn || false)
  const error = useSelector(state=>state.auth.error)
   const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  const passwordPattern = /^(?=.*[a-zA-Z]{6})(?=.*\d)[a-zA-Z\d]{7}$/;
  
  useEffect(() => {
    if (isLoggedIn && isSubmitted) {
      navigate('/dictionary', { replace: true });
    }
  }, [isLoggedIn, isSubmitted, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || 'An error occurred!');
    }
  }, [error]);

  const validationLogin = Yup.object().shape({
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

  const handleSubmit = async (values, action) => {
    try {
      const { email, password } = values;
      if(!emailPattern.test(email)){
        alert("Please enter correct email format")
      }
      if(!passwordPattern.test(password)){
        alert("Please enter correct password format")
      }
      console.log("Form submitted with values:", name, email, password);
      await dispatch(loginUser({ email, password }));
      setIsSubmitted(true);
      action.resetForm();
      toast.success("Login is successful");
      
    } catch (e) {
      toast.error("Login is failed: ", e);
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center min-w-[400px] md:flex-row md:min-w-[720px] gap-10 md:gap-20 mt-15">
      <div className="bg-[#85AA9F]/10 max-w-sm md:min-w-[400px] lg:max-w-lg w-full pt-8 pr-15 pl-15 pb-8 rounded-4xl">
        <h1 className="text-2xl font-semibold mb-6 text-start">Login</h1>
        <p className="text-justify mb-4">
          Please enter your login details to continue using our service:
        </p>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationLogin}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-3">
              <div className="gap-3 flex flex-col">
                <Field
                  name="email"
                  placeholder="Email"
                  className="border border-[#121417]/10 p-3 rounded-xl"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                ></ErrorMessage>
              </div>
              <div className="gap-3 flex flex-col relative">
                <Field
                  name="password"
                  placeholder="Pasword"
                  type={showPassword ? "text" : "password"}
                  className="border border-[#121417]/10 p-3 rounded-xl"
                />
                <button
                  className="absolute right-4 top-4 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
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
                  className="text-red-500 text-sm"
                ></ErrorMessage>
              </div>
              <div className="flex flex-col mt-3 font-semibold">
                <button
                  type="submit"
                  className="colorfulButton w-full h-13 rounded-2xl"
                >
                  {isSubmitting ? "Logging" : "Login"}
                </button>
             
              </div>
            </Form>
          )}
        </Formik>
           <button
                  type="button"
                  className="border-none underline text-[#85AA9F] w-full h-13 rounded-2xl"
                  onClick={() =>{ navigate("/register", { replace: true })} }
                >
                  Register
                </button>
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
