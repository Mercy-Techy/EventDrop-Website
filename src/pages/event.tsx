import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { PiImageSquare } from "react-icons/pi";
import AddEvent from "../components/functions/addEvent";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "../api/event";
import { HashLoader } from "react-spinners";
import Pagination from "../components/ui/pagination";

const Events = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const { data, isLoading } = useQuery({
    queryFn: () => fetchEvents(page),
    queryKey: ["events", page],
  });

  return (
    <>
      {show && <AddEvent closeModal={() => setShow(false)} />}
      <div className="bg-gray-50 p-7 lg:p-5 lg:rounded-t-2xl min-h-[94.2vh]">
        <div className="flex justify-end mt-10">
          <button
            onClick={() => setShow(true)}
            className="text-white font-bold rounded-lg bg-black py-4 px-6"
          >
            Add Event
          </button>
        </div>
        <div className="font-pacific text-5xl text-center ">Events</div>
        {!isLoading && (!data?.data || data?.data?.length === 0) && (
          <div className="h-28 flex justify-center items-center mt-16">
            You Have No Event
          </div>
        )}
        {isLoading && (
          <div className="h-28 flex justify-center items-center mt-16">
            <HashLoader size={50} color="#000000" />
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {!isLoading &&
            data?.totalItems > 0 &&
            data?.data?.map((event: any) => (
              <div className="bg-white shadow h-120 rounded text-sm">
                <img
                  src={event?.logo_url || ""}
                  alt="Logo"
                  className="h-40 w-full object-cover rounded-t"
                />
                <div className="p-3">
                  <h1 className="font-semibold text-2xl capitalize">
                    {event?.title}
                  </h1>
                  <p className="text-[13px] mt-2 capitalize">
                    {event?.event_location}
                  </p>
                  <p className="text-[13px] text-gray-400 mb-4">
                    {event?.event_date}
                  </p>
                  <p>
                    {event?.description?.length > 220
                      ? event?.description?.slice(0, 218) + "..."
                      : event?.description}
                  </p>
                  <div className="flex gap-1 text-gray-400 items-center mt-4">
                    <IoCopyOutline />{" "}
                    <span>
                      {(window.location.origin + "/" + event?.generated_link)
                        ?.length > 36
                        ? (
                            window.location.origin +
                            "/" +
                            event?.generated_link
                          )?.slice(0, 34) + "..."
                        : window.location.origin + "/" + event?.generated_link}
                    </span>
                  </div>
                  <p className="flex gap-1 text-gray-400 items-center">
                    <PiImageSquare className="text-base" />{" "}
                    <span>{event?.noofimages}</span>
                  </p>
                </div>
              </div>
            ))}
        </div>
        {!isLoading && data?.data?.length > 0 && (
          <Pagination page={page} setPage={setPage} data={data} />
        )}
      </div>
    </>
  );
};

export default Events;
