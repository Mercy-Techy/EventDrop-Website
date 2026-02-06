import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { BeatLoader, ClipLoader } from "react-spinners";
import {
  requestPasswordReset,
  resendEmailToken,
  resetPassword,
  verifyEmail,
  type CustomError,
} from "../../api/auth";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const Verification = ({
  type,
  onComplete,
  email,
  length = 6,
}: {
  type: "email" | "password";
  email: string;
  onComplete: any;
  length?: number;
}) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [otp, setOtp] = useState<string[]>(Array(length).fill(""));
  const [timeLeft, setTimeLeft] = useState<number>(120);
  const [canResend, setCanResend] = useState<boolean>(false);
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: type === "email" ? verifyEmail : resetPassword,
    onSuccess: (data) => {
      toast.success(data.message);
      onComplete();
      return navigate("/login");
    },
  });
  const { mutate: resendMutate, isPending: resetPending } = useMutation({
    mutationFn: type === "email" ? resendEmailToken : requestPasswordReset,
    onSuccess: (data) => {
      toast.success(data.message);
      setCanResend(false);
      return setTimeLeft(120);
    },
    onError: (data: CustomError) =>
      toast.error(data?.response?.data?.message || data?.message),
  });

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);
  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    const newOtp = pasted.split("");
    setOtp([...newOtp, ...Array(length - newOtp.length).fill("")]);

    inputsRef.current[Math.min(pasted.length, length) - 1]?.focus();
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F5EDE0] p-6 rounded-md text-center mx-10 w-full md:w-2/3 lg:w-1/2">
        <div className="flex justify-end">
          <IoClose className="text-4xl" onClick={onComplete} />
        </div>
        <h1 className="text-2xl">
          {type === "email" ? "Verify Your Email" : "Reset Your Password"}
        </h1>
        <p className="text-sm text-[#D97A5B]">
          A code has been sent to your mail to{" "}
          {type === "email" ? "verify your email" : "reset your password"}
        </p>
        <div className="flex gap-3 justify-center mt-10">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="
        w-14 h-16
        text-center text-lg font-semibold
        border-2 border-[#D97A5B] rounded-lg
        focus:outline-none focus:ring-2 focus:ring-[#D97A5B]
      "
            />
          ))}
        </div>
        <div>
          <button
            disabled={otp.length !== length}
            onClick={() => mutate({ token: otp.join(""), password: "" })}
            type="button"
            className={`text-white font-bold py-3 rounded-lg w-full md:w-2/3 lg:w-1/2 mt-10 ${
              otp.length !== length ? "bg-[#D97A5B]/50" : "bg-[#D97A5B]"
            }`}
          >
            {isPending && otp.length === length ? (
              <ClipLoader color="white" size={21} />
            ) : (
              "Submit"
            )}
          </button>
        </div>

        <div className="mt-2">
          Didn't get the token,{" "}
          {timeLeft > 0 && !canResend && (
            <span>
              resend in{" "}
              {timeLeft > 60
                ? `${Math.trunc(timeLeft / 60)} minutes, ${timeLeft % 60} seconds`
                : `${timeLeft} seconds`}
            </span>
          )}
          {timeLeft == 0 && canResend && (
            <span>
              {true ? (
                <BeatLoader size={10} />
              ) : (
                <button
                  onClick={() => resendMutate(email)}
                  className="underline"
                >
                  resend
                </button>
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Verification;
