import { Link, useNavigate } from "react-router";
import PasswordInput from "../components/ui/passwordInput";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { logIn, type CustomError } from "../api/auth";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";
import Masonry from "../components/ui/masonry";
import { photos } from "./home";
import { useAuth } from "../context/authcontext";

const Login = () => {
  const { logIn: login } = useAuth();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisable] = useState(true);
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({ mutationFn: logIn });

  useEffect(() => {
    if (userDetails.email && userDetails.password)
      return setButtonDisable(false);
  }, [userDetails]);

  const textChange = (name: string, value: string) =>
    setUserDetails((state) => ({ ...state, [name]: value }));

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
  return (
    <div className="md:flex bg-black">
      <div className="hidden md:block md:w-1/2 lg:w-2/3 relative">
        <div className="absolute inset-0 bg-black/50 bg-opacity-50 z-40"></div>
        <h1 className="text-yellow-300/80 font-bold text-7xl lg:text-9xl font-pacific absolute inset-0 flex mt-48 justify-center z-50">
          EventDrop
        </h1>
        <Masonry images={[...photos.slice(0, 9)]} />
      </div>
      <form className="w-full md:w-1/2 py-10 px-8  text-white">
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
        </div>
        <div className="my-10">
          <button
            type="button"
            onClick={logInHandler}
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
