import { SlEvent } from "react-icons/sl";
import { FaUserCircle } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../context/authcontext";
import { useNavigate } from "react-router";

const SideBar = () => {
  const [show, setShow] = useState(false);
  const { logOut } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-white bg-neutral-900 p-2 rounded"
        onClick={() => setShow(true)}
      >
        <HiOutlineMenuAlt1 className="text-3xl" />
      </button>

      {/* Overlay */}
      {show && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShow(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50
          h-screen w-4/5 md:w-3/5 lg:w-1/5
          bg-neutral-900 text-white p-6
          transform transition-transform duration-300
          ${show ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <button
          className="lg:hidden absolute top-4 right-4"
          onClick={() => setShow(false)}
        >
          <IoClose className="text-3xl" />
        </button>

        <div className="flex bg-neutral-800 rounded-2xl shadow gap-5 px-5 py-6">
          <FaUserCircle className="text-4xl text-white" />
          <div className="flex flex-col justify-center">
            <p className="text-lg">Arawole Mercy</p>
            <div className="text-sm">Free Plan</div>
          </div>
        </div>

        <ul className="mt-10">
          <li
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 cursor-pointer px-5 py-4 rounded-lg hover:bg-neutral-800"
          >
            <SlEvent className="text-white" />
            <div>Events</div>
          </li>

          <li className="flex items-center gap-3 cursor-pointer px-5 py-4 rounded-lg hover:bg-neutral-800">
            <GrGallery className="text-white" />
            <div>Gallery</div>
          </li>

          <li className="flex items-center gap-3 cursor-pointer px-5 py-4 rounded-lg hover:bg-neutral-800">
            <CgProfile className="text-white" />
            <div>Profile</div>
          </li>
        </ul>

        <button
          onClick={logOut}
          className="text-pink-700 w-4/5 absolute bottom-4 flex items-center gap-3 cursor-pointer px-5 py-4 rounded-lg hover:bg-neutral-800 hover:text-white"
        >
          <IoIosLogOut />
          <div>Logout</div>
        </button>
      </div>
    </>
  );
};

export default SideBar;
