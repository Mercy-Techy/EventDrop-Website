import { Link, useNavigate } from "react-router";
import PasswordInput from "../components/ui/passwordInput";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signUp, type CustomError } from "../api/auth";
import { toast } from "sonner";
import CheckBox from "../components/ui/checkbox";
import { ClipLoader } from "react-spinners";

const SignUp = () => {
  const [buttonDisabled, setButtonDisable] = useState(true);
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    plan: "free",
  });

  const checks = {
    upper: /[A-Z]/.test(userDetails.password),
    lower: /[a-z]/.test(userDetails.password),
    number: /[0-9]/.test(userDetails.password),
    special: /[^A-Za-z0-9]/.test(userDetails.password),
    length: userDetails.password.length >= 8,
  };

  const textChange = (name: string, value: string) =>
    setUserDetails((state) => ({ ...state, [name]: value }));
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({ mutationFn: signUp });

  const signUpHandler = () => {
    const details: any = userDetails;
    for (let input in details) {
      if (!details[input] || details[input]?.length < 3)
        return toast.error(
          `A valid ${
            input === "firstname"
              ? "first name"
              : input === "lastname"
              ? "last name"
              : input
          } is required`
        );
    }
    mutate(details, {
      onSuccess: () => {
        // toast.success("Welcome to EventDrop");
        // return navigate("/dashboard");
      },
      onError: (data: CustomError) =>
        toast.error(data?.response?.data?.message || data?.message),
    });
  };

  useEffect(() => {
    const details: any = userDetails;
    for (let input in details) {
      if (!details[input]) return setButtonDisable(true);
      if (input === "password") {
        const strongPasswordRegex =
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(
            userDetails.password
          );

        if (!strongPasswordRegex) return setButtonDisable(true);
      }
    }
    setButtonDisable(false);
  }, [userDetails]);

  return (
    <div className="md:flex h-full">
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
          Sign Up
        </div>
        <div className="my-10">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="font-semibold">
              First Name
            </label>
            <input
              type="text"
              className="bg-white px-2 py-3 outline-none rounded-md w-full"
              placeholder="first name"
              value={userDetails.firstname}
              name="firstname"
              onChange={(e) => textChange("firstname", e.target.value)}
            />
          </div>
          <div className="mt-6 flex flex-col gap-1">
            <label htmlFor="" className="font-semibold">
              Last Name
            </label>
            <input
              type="text"
              className="bg-white px-2 py-3 outline-none rounded-md w-full"
              placeholder="last name"
              value={userDetails.lastname}
              name="lastname"
              onChange={(e) => textChange("lastname", e.target.value)}
            />
          </div>
          <div className="mt-6 flex flex-col gap-1">
            <label htmlFor="" className="font-semibold">
              Email
            </label>
            <input
              type="email"
              className="bg-white px-2 py-3 outline-none rounded-md w-full"
              placeholder="email"
              value={userDetails.email}
              name="email"
              onChange={(e) => textChange("email", e.target.value)}
            />
          </div>
          <PasswordInput
            className="mt-6 flex flex-col gap-1"
            inputClassName="bg-white px-2 py-3 rounded-md"
            labelClassname="font-semibold"
            label="Password"
            value={userDetails.password}
            name="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              textChange("password", e.target.value)
            }
          />
          <div className="mt-3 space-y-1 text-sm">
            <CheckBox
              label="At least one uppercase letter (A–Z)"
              valid={checks.upper}
            />
            <CheckBox
              label="At least one lowercase letter (a–z)"
              valid={checks.lower}
            />
            <CheckBox label="Contains a number (0–9)" valid={checks.number} />
            <CheckBox
              label="Contains a special character (! @ # $ % ...)"
              valid={checks.special}
            />
            <CheckBox
              label="At least 8 characters long"
              valid={checks.length}
            />
          </div>
        </div>
        <div className="my-10">
          <button
            disabled={buttonDisabled}
            onClick={signUpHandler}
            type="button"
            className={`text-white font-bold py-3 rounded-lg w-full ${
              buttonDisabled ? "bg-[#D97A5B]/50" : "bg-[#D97A5B]"
            }`}
          >
            {isPending && !buttonDisabled ? (
              <ClipLoader color="white" size={21} />
            ) : (
              "Sign Up"
            )}
          </button>
          <div className="text-sm text-center mt-2">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
