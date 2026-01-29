import { Link, useNavigate } from "react-router";
import PasswordInput from "../components/ui/passwordInput";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { logIn, type CustomError } from "../api/auth";
import { toast } from "sonner";
import { ClipLoader } from "react-spinners";

const Login = () => {
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
      onSuccess: () => {
        toast.success("Welcome to EventDrop");
        return navigate("/dashboard");
      },
      onError: (data: CustomError) =>
        toast.error(data?.response?.data?.message || data?.message),
    });
  };
  return (
    <div className="md:flex h-screen">
      <div className="hidden md:block md:w-1/3 lg:w-1/2 relative">
        <img
          src="./auth.png"
          alt="image"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#D97A5B]/40 mix-blend-overlay"></div>
      </div>
      <form className="bg-[#F5EDE0] w-full md:2/3 lg:w-1/2 py-10 px-8 lg:px-16">
        <div className="text-[#D97A5B] font-bold text-3xl font-pacific text-center">
          Log In
        </div>
        <div className="my-10">
          <div className="mt-6 flex flex-col gap-1">
            <label htmlFor="" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              className="bg-white px-2 py-3 outline-none rounded-md w-full"
              placeholder="email"
              name="email"
              onChange={(e) => textChange("email", e.target.value)}
            />
          </div>
          <PasswordInput
            className="mt-6 flex flex-col gap-1"
            inputClassName="bg-white px-2 py-3 rounded-md"
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
            className="bg-[#D97A5B] text-white font-bold py-3 rounded-lg w-full"
          >
            {isPending && !buttonDisabled ? (
              <ClipLoader color="white" size={21} />
            ) : (
              "Submit"
            )}
          </button>
          <div className="text-sm text-center mt-2">
            Do not have an account?{" "}
            <Link to="/signup" className="underline">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
