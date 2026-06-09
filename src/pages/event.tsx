import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { fetchEventById, fetchEventImages } from "../api/event";
import { format } from "date-fns";
import { IoCopyOutline } from "react-icons/io5";
import Masonry from "../components/ui/masonry";
import { photos } from "../screens/home";
import { useState } from "react";
import UploadImage from "../components/functions/uploadImage";
import { HashLoader } from "react-spinners";
import Pagination from "../components/ui/pagination";

const Events = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: ["events", "event", id],
    queryFn: () => fetchEventById(id!),
  });
  const { data: images, isLoading: imageLoading } = useQuery({
    queryKey: ["events", "event", id, "images"],
    queryFn: () => fetchEventImages(page, id!),
  });
  console.log(images);

  if (!data && !isLoading) return <div>Event does not exist</div>;
  const event: any = data;
  return (
    <>
      {show && (
        <UploadImage eventId={event?.id} closeModal={() => setShow(false)} />
      )}
      <div className="bg-gray-50 lg:rounded-t-2xl min-h-[94.2vh]">
        <div className="relative h-60">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${event?.logo_url})`,
            }}
          />

          <div className="absolute inset-0 bg-black/60" />

          <div className="relative z-10 p-7 lg:p-5 text-white">
            <h1 className="font-semibold text-4xl capitalize">
              {event?.title}
            </h1>
            <p className=" mt-2 capitalize">{event?.event_location}</p>
            <p className="">
              {event?.event_date &&
                format(new Date(event?.event_date), "do 'of' MMMM yyyy")}
            </p>
          </div>
        </div>
        <div className="flex justify-between mt-10 px-10">
          <div className="flex items-center gap-5">
            <button className="text-white font-bold rounded-lg bg-black py-4 px-6">
              Generate New Link
            </button>
            <div className="flex gap-1 text-gray-600 items-center mt-4">
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
          </div>
          <button
            onClick={() => setShow(true)}
            className="text-white font-bold rounded-lg bg-black py-4 px-6"
          >
            Upload Image
          </button>
        </div>
        <div className="mt-20 px-10">
          <div className="font-pacific text-5xl text-center mb-10">Images</div>
          {!imageLoading && (!images?.data || images?.data?.length === 0) && (
            <div className="h-28 flex justify-center items-center mt-16">
              You Have No Image for this Event
            </div>
          )}
          {imageLoading && (
            <div className="h-28 flex justify-center items-center mt-16">
              <HashLoader size={50} color="#000000" />
            </div>
          )}
          {!imageLoading && images?.totalItems > 0 && (
            <Masonry images={images.data} />
          )}
          {!imageLoading && images?.totalPages > 1 && (
            <Pagination page={page} setPage={setPage} data={images} />
          )}
        </div>
      </div>
    </>
  );
};

export default Events;
