import { useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { FaLink } from "react-icons/fa6";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import { MdSecurity } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import { TbCurrencyNaira } from "react-icons/tb";
import { Link } from "react-router";

const Home = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="font-nunito">
      <nav className="fixed shadow bg-[#F5EDE0] p-4 md:px-16 w-full lg:flex justify-between items-center">
        {show && (
          <div className="flex justify-end text-2xl">
            <IoMdClose onClick={() => setShow(false)} />
          </div>
        )}
        {!show && (
          <div className="flex gap-2 items-center">
            {!show && (
              <div className="lg:hidden text-2xl">
                <RiMenu2Fill onClick={() => setShow(true)} />
              </div>
            )}
            <div className="text-[#D97A5B] font-bold text-3xl font-pacific ">
              EventDrop
            </div>
          </div>
        )}
        <ul className="hidden lg:flex gap-16 items-center">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#how">How it works</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <Link to="/login">Log in</Link>
          </li>
          <li className="bg-[#D97A5B] text-white px-4 py-2 rounded-lg">
            <Link to="/signup">Sign up</Link>
          </li>
        </ul>
        {show && (
          <ul className="lg:hidden mt-10 lg:mt-0 gap-16 h-80 items-center">
            <li className="mb-5 lg:mb-0" onClick={() => setShow(false)}>
              <a href="#features">Features</a>
            </li>
            <li className="mb-5 lg:mb-0" onClick={() => setShow(false)}>
              <a href="#how">How it works</a>
            </li>
            <li className="mb-5 lg:mb-0" onClick={() => setShow(false)}>
              <a href="#pricing">Pricing</a>
            </li>
            <li className="mb-5 lg:mb-0">
              <Link to="/login">Log in</Link>
            </li>
            <li className="bg-[#D97A5B] text-white px-4 py-2 rounded-lg w-1/2 md:w-1/3 lg:w-full">
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        )}
      </nav>
      <main className="py-20 px-10 md:px-20 lg:px-40">
        <div>
          <div className="lg:flex gap-16 w-full my-10">
            <div className="w-full lg:w-1/2 text-center">
              <h1 className="text-4xl md:text-6xl font-bold">
                Your event happened once. The memories shouldn’t be scattered.
              </h1>
              <div className="mt-4 md:text-lg">
                We help you gather every photo taken at your event, from every
                angle and every person. Create a shared album, upload your
                pictures, and invite your guests to add theirs with one simple
                link. All your memories, saved beautifully in one place you can
                revisit anytime.
              </div>
            </div>
            <img
              src="/phone.png"
              alt=""
              className="w-full lg:w-1/3 rounded-lg mt-5 lg:mt-0"
            />
          </div>

          <section id="features" className="my-20">
            <h1 className="text-center text-4xl font-bold font-pacific text-[#D97A5B]">
              Why Choose EventDrop
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
              <div className="flex flex-col items-center">
                <div className="text-[#D97A5B] bg-[#D97A5B]/10 w-14 h-14 flex justify-center items-center rounded-full">
                  <FaLink className="text-xl" />
                </div>
                <h2 className="font-bold text-lg my-4">
                  No App or Account Required
                </h2>
                <p className="text-center">
                  Your guests can upload photos instantly using the generated
                  link - no app downloads, no sign-ups. They simply click the
                  link, upload their photos, view other event photos uploaded by
                  you and others, download photos and they're done. Perfect for
                  guests who don't want to install another app on their phone.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[#D97A5B] bg-[#D97A5B]/10 w-14 h-14 flex justify-center items-center rounded-full">
                  <CiImageOn className="text-xl font-bold" />
                </div>
                <h2 className="font-bold text-lg my-4">
                  Original Quality Photos
                </h2>
                <p className="text-center">
                  Unlike messaging apps that compress images, EventDrop
                  preserves full resolution and quality. Your wedding photos,
                  vacation memories, and party pictures are stored and shared
                  exactly as they were captured – no quality loss.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-[#D97A5B] bg-[#D97A5B]/10 w-14 h-14 flex justify-center items-center rounded-full">
                  <MdSecurity className="text-xl" />
                </div>
                <h2 className="font-bold text-lg my-4">Private and Secure</h2>
                <p className="text-center">
                  Your event photos are completely private and secure. Only
                  people with your unique link can upload or view photos. No
                  social media sharing, no public galleries – just you and your
                  invited guests. You maintain full control over who can access
                  your gallery.
                </p>
              </div>
            </div>
            <div className="mt-20">
              <h1 className="mb-8 text-center text-4xl font-bold ">
                Perfect for Every Type of Celebration
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                <div className="w-full bg-[#F5EDE0] shadow rounded-lg">
                  <img
                    src="/p6.jfif"
                    alt=""
                    className="h-80 w-full rounded-t-lg"
                  />
                  <p className=" p-4 text-lg">Wedding Ceremony</p>
                </div>
                <div className="w-full bg-[#F5EDE0] shadow rounded-lg">
                  <img
                    src="/p5.jfif"
                    alt=""
                    className="h-80 w-full rounded-t-lg"
                  />
                  <p className=" p-4 text-lg">Baby Shower</p>
                </div>
                <div className="w-full bg-[#F5EDE0] shadow rounded-lg">
                  <img
                    src="/p4.jfif"
                    alt=""
                    className="h-80 w-full rounded-t-lg"
                  />
                  <p className=" p-4 text-lg">Birthday</p>
                </div>
                <div className="w-full bg-[#F5EDE0] shadow rounded-lg">
                  <img
                    src="/p3.jfif"
                    alt=""
                    className="h-80 w-full rounded-t-lg"
                  />
                  <p className=" p-4 text-lg">Briday Shower</p>
                </div>
                <div className="w-full bg-[#F5EDE0] shadow rounded-lg">
                  <img
                    src="/p2.jfif"
                    alt=""
                    className="h-80 w-full rounded-t-lg"
                  />
                  <p className=" p-4 text-lg">Graduation</p>
                </div>
                <div className="w-full bg-[#F5EDE0] shadow rounded-lg">
                  <img
                    src="/p1.jfif"
                    alt=""
                    className="h-80 w-full rounded-t-lg"
                  />
                  <p className=" p-4 text-lg">Picnic</p>
                </div>
              </div>
            </div>
          </section>

          <section id="how">
            <h1 className="text-center text-4xl font-bold ">How It Works</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
              <div className="flex flex-col items-center">
                <div className="text-white bg-[#D97A5B] w-10 h-10 flex justify-center items-center rounded-full">
                  <span className="font-bold">1</span>
                </div>
                <h2 className="font-bold text-lg my-4">Create Event</h2>
                <p className="text-center">
                  Sign up with your email and create an event. Give it a
                  memorable title to get started. You can also upload images to
                  the created event.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-white bg-[#D97A5B] w-10 h-10 flex justify-center items-center rounded-full">
                  <span className="font-bold">2</span>
                </div>
                <h2 className="font-bold text-lg my-4">Share the Link</h2>
                <p className="text-center">
                  Copy your unique event link and share it with your guests via
                  text, email, or social media.
                </p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-white bg-[#D97A5B] w-10 h-10 flex justify-center items-center rounded-full">
                  <span className="font-bold">3</span>
                </div>
                <h2 className="font-bold text-lg my-4">Collect Memories</h2>
                <p className="text-center">
                  Guests upload their photos. Everyone can browse the gallery
                  and download their favorites.
                </p>
              </div>
            </div>
          </section>

          <section id="pricing">
            <h1 className="text-center text-4xl font-bold mt-20">Pricing</h1>
          </section>
          <div className="md:flex w-full gap-20 justify-center mt-10">
            <div className="w-full md:w-1/2 lg:w-1/3 border rounded-md border-[#D97A5B] px-10 py-4">
              <div className="border-b border-[#D97A5B] py-4 flex flex-col items-center">
                <p className="text-xl font-bold">Free</p>
                <p className="flex items-center text-3xl font-bold text-[#D97A5B]">
                  <TbCurrencyNaira /> <span>0</span>
                </p>
                <p className="text-sm text-stone-500">Free Forever</p>
              </div>
              <ul className="mt-8">
                <li className="flex items-center gap-2 mb-4">
                  <IoMdCheckmark className="text-[#D97A5B] font-bold text-xl" />{" "}
                  <span>Full Platform Access</span>
                </li>
                <li className="flex items-center gap-2 mb-4">
                  <IoMdCheckmark className="text-[#D97A5B] font-bold text-xl" />{" "}
                  <span>Unlimited photos per event</span>
                </li>
                <li className="flex items-center gap-2 mb-4">
                  <IoMdCheckmark className="text-[#D97A5B] font-bold text-xl" />{" "}
                  <span>Unlimited events</span>
                </li>
                <li className="flex items-center gap-2 mb-4">
                  <IoMdCheckmark className="text-[#D97A5B] font-bold text-xl" />{" "}
                  <span>30 days retention per event</span>
                </li>
                <li className="flex items-center gap-2 mb-4">
                  <IoMdCheckmark className="text-[#D97A5B] font-bold text-xl" />{" "}
                  <span>Unlimited number of guest</span>
                </li>
                <li className="flex items-center gap-2 mb-4">
                  <IoMdCheckmark className="text-[#D97A5B] font-bold text-xl" />{" "}
                  <span>Upgrade anytime</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 md:mt-0 w-full md:w-1/2 lg:w-1/3 border rounded-md border-[#D97A5B] px-10 py-4">
              <div className="border-b border-[#D97A5B] py-4 flex flex-col items-center">
                <p className="text-xl font-bold">Premium</p>
                <p className="flex items-center text-3xl font-bold text-[#D97A5B]">
                  <TbCurrencyNaira /> <span>1000</span>
                </p>
                <p className="text-sm text-stone-500">Per Month</p>
              </div>
              <ul className="mt-8">
                <li className="flex items-center gap-2 mb-4">
                  <IoMdCheckmark className="text-[#D97A5B] font-bold text-xl" />{" "}
                  <span>Full Platform Access</span>
                </li>
                <li className="flex items-center gap-2 mb-4">
                  <IoMdCheckmark className="text-[#D97A5B] font-bold text-xl" />{" "}
                  <span>Unlimited photos per event</span>
                </li>
                <li className="flex items-center gap-2 mb-4">
                  <IoMdCheckmark className="text-[#D97A5B] font-bold text-xl" />{" "}
                  <span>Unlimited events</span>
                </li>
                <li className="flex items-center gap-2 mb-4">
                  <IoMdCheckmark className="text-[#D97A5B] font-bold text-xl" />{" "}
                  <span>Events retained forever</span>
                </li>
                <li className="flex items-center gap-2 mb-4">
                  <IoMdCheckmark className="text-[#D97A5B] font-bold text-xl" />{" "}
                  <span>Unlimited number of guest</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
