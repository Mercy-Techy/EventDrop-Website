import { useState } from "react";
import { PiEyeSlashFill } from "react-icons/pi";
import { IoEyeSharp } from "react-icons/io5";

const PasswordInput = ({
  name,
  placeholder,
  onChange,
  className,
  value,
  inputClassName,
  labelClassname,
  label,
}: {
  name?: string;
  placeholder?: string;
  className: string;
  value?: string;
  onChange: any;
  inputClassName: string;
  label: string;
  labelClassname: string;
}) => {
  const [show, setShow] = useState(false);
  const options = value ? { value } : {};
  return (
    <div className={className}>
      <label htmlFor="" className={labelClassname}>
        {label}
      </label>
      <div
        className={`flex gap-2 justify-between items-center w-full ${inputClassName}`}
      >
        <input
          type={show ? "text" : "password"}
          name={name || "password"}
          className="outline-none w-full"
          placeholder={placeholder || "Enter your password"}
          onChange={onChange}
          {...options}
        />
        {show && (
          <PiEyeSlashFill
            className="text-[#4B5563]"
            onClick={() => setShow((prev) => !prev)}
          />
        )}
        {!show && (
          <IoEyeSharp
            className="text-[#4B5563]"
            onClick={() => setShow((prev) => !prev)}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
