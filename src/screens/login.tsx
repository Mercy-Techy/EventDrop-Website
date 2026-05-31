import { Link, Navigate, useNavigate } from "react-router";
import PasswordInput from "../components/ui/passwordInput";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { logIn, requestPasswordReset, type CustomError } from "../api/auth";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import Masonry from "../components/ui/masonry";
import { photos } from "./home";
import { useAuth } from "../context/authcontext";
import Verification from "../components/functions/verification";
import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "motion/react";

const mansoryimages = [...photos.slice(0, 6)];

const Login = () => {
  const { logIn: login } = useAuth();
  const { isAuth } = useAuth();
  const [forgot, setForgot] = useState(false);
  const [forgotToken, setForgotToken] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisable] = useState(true);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({ mutationFn: logIn });
  const { mutate: forgotMutate, isPending: forgotPending } = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: (data) => {
      toast.success(data.message);
      setForgot(false);
      return setForgotToken(true);
    },
    onError: (data: CustomError) =>
      toast.error(data?.response?.data?.message || data?.message),
  });

  useEffect(() => {
    if (userDetails.email && userDetails.password)
      return setButtonDisable(false);
  }, [userDetails]);

  const textChange = (name: string, value: string) =>
    setUserDetails((state) => ({ ...state, [name]: value }));

  const requestForgotPassword = () => {
    if (!userDetails.email) return toast.error("Email is required");
    return forgotMutate(userDetails.email);
  };

  const logInHandler = () => {
    if (!userDetails.email || !userDetails.password)
      return toast.error("A valid email and password is required");
    mutate(userDetails, {
      onSuccess: (data) => {
        login(data.data.user, data.data.token);
        toast.success("Welcome to EventDrop");
        return navigate("/dashboard");
      },
      onError: (data: CustomError) =>
        toast.error(data?.response?.data?.message || data?.message),
    });
  };
  if (isAuth) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="md:flex bg-black">
      {forgotToken && (
        <Verification
          type="password"
          onComplete={() => setForgotToken(false)}
          email={userDetails.email}
        />
      )}
      <AnimatePresence>
        {forgot && (
          <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-60">
            <motion.div
              key="forgot-modal"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.5 }}
              className="bg-black text-white p-6 rounded-md mx-10 md:px-16 md:w-2/3 lg:w-1/2"
            >
              <div className="flex justify-end text-2xl font-bold">
                <IoMdClose onClick={() => setForgot(false)} />
              </div>
              <div className="mt-6 flex flex-col gap-2">
                <label htmlFor="" className="font-semibold">
                  Email
                </label>
                <input
                  type="email"
                  className="bg-neutral-900 px-2 py-3 outline-none rounded-md w-full"
                  placeholder="email"
                  name="email"
                  onChange={(e) => textChange("email", e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={requestForgotPassword}
                className="text-yellow-300 font-bold py-3 rounded-lg w-full bg-yellow-300/10 mt-10"
              >
                {forgotPending ? (
                  <ClipLoader color="white" size={21} />
                ) : (
                  "Submit"
                )}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <div className="hidden md:block md:w-1/2 lg:w-2/3 relative">
        <div className="absolute inset-0 bg-black/50 bg-opacity-50 z-40"></div>
        <h1 className="text-yellow-300/80 font-bold text-7xl lg:text-9xl font-pacific absolute inset-0 flex mt-48 justify-center z-50">
          EventDrop
        </h1>
        <Masonry images={mansoryimages} />
      </div>
      <form
        className="w-full md:w-1/2 py-10 px-8  text-white"
        onSubmit={(e) => {
          e.preventDefault();
          logInHandler();
        }}
      >
        <div className="font-bold text-3xl font-pacific text-center">
          Log In
        </div>
        <div className="my-10">
          <div className="mt-6 flex flex-col gap-1">
            <label htmlFor="" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              className="bg-neutral-900 px-2 py-3 outline-none rounded-md w-full"
              placeholder="email"
              name="email"
              onChange={(e) => textChange("email", e.target.value)}
            />
          </div>
          <PasswordInput
            className="mt-6 flex flex-col gap-1"
            inputClassName="bg-neutral-900 px-2 py-3 outline-none rounded-md w-full"
            labelClassname="font-semibold"
            label="Password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              textChange("password", e.target.value)
            }
          />
          <div
            className="text-sm text-end text-yellow-300 underline cursor-pointer"
            onClick={() => setForgot(true)}
          >
            Forgot password
          </div>
        </div>
        <div className="my-10">
          <button
            type="submit"
            className="text-yellow-300 font-bold py-3 rounded-lg w-full bg-yellow-300/10 "
          >
            {isPending && !buttonDisabled ? (
              <ClipLoader color="white" size={21} />
            ) : (
              "Submit"
            )}
          </button>
          <div className="text-sm text-center mt-2">
            Do not have an account?{" "}
            <Link to="/signup" className="underline text-yellow-300">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
