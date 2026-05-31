import { IoCloseOutline, IoCloseSharp } from "react-icons/io5";
import { useAuth } from "../../context/authcontext";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { addEvent } from "../../api/event";
import type { CustomError } from "../../api/auth";
import { queryClient } from "../../App";
import { ClipLoader } from "react-spinners";

const AddEvent = ({ closeModal }: { closeModal: () => void }) => {
  const { user } = useAuth();
  const [logo, setLogo] = useState<File | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: addEvent,
    onError: (data: CustomError) =>
      toast.error(data?.response?.data?.message || data?.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success(data?.message);
      return closeModal();
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const form_data = Object.fromEntries(form);
    for (let i in form_data) {
      if (
        !form_data[i] ||
        (typeof form_data[i] === "string" && form_data[i].length < 3)
      ) {
        return toast.error(`${i} is required`);
      }
    }

    mutate(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-60">
      <div className="bg-white mx-10 w-full md:w-3/4 lg:w-1/2 rounded max-h-[95vh] lg:max-h-full overflow-y-auto">
        <div className="flex justify-end m-4">
          <IoCloseSharp className="text-2xl" onClick={closeModal} />
        </div>
        <div className="text-center mt-10 text-2xl font-bold">Add Event</div>
        <form className="p-10 md:px-16" onSubmit={onSubmit}>
          <div className="lg:flex lg:gap-10 items-center">
            <div className="w-full">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                className="border border-gray-300 w-full p-2 rounded"
              />
            </div>
            <div className="w-full mt-5 lg:mt-0">
              <label htmlFor="event_date">Event Date</label>
              <input
                type="date"
                name="event_date"
                className="border border-gray-300 w-full p-2 rounded"
              />
            </div>
          </div>
          <div className="lg:flex lg:gap-10 mt-5">
            <div className="w-full mt-5">
              <label htmlFor="event_location">Event Location</label>
              <input
                type="text"
                name="event_location"
                className="border border-gray-300 w-full p-2 rounded"
              />
            </div>
            {user?.plan !== "free" ? (
              <div className="w-full mt-5 lg:mt-0">
                <label htmlFor="link_expires_at">Link Expiry Date</label>
                <input
                  type="date"
                  name="link_expires_at"
                  className="border border-gray-300 w-full p-2 rounded"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="lg:flex lg:gap-10 mt-5 items-center">
            <div className="w-full">
              <label htmlFor="event_time">Event Time</label>
              <input
                type="time"
                name="event_time"
                className="border border-gray-300 w-full p-2 rounded"
              />
            </div>
            <div className="w-full mt-5 lg:mt-0 relative">
              <label className="block mb-1" htmlFor="logo">
                Event Logo
              </label>

              <input
                id="logo"
                type="file"
                name="logo"
                accept=".png,.jpg,.jpeg,image/png,image/jpeg"
                className="hidden"
                onChange={(e) => setLogo(e.target.files?.[0] || null)}
              />

              <label
                htmlFor="logo"
                className="bg-gray-200 w-full h-10 rounded flex items-center justify-center cursor-pointer"
              >
                {logo ? logo.name : "Select Logo"}
                {logo && (
                  <span>
                    <IoCloseOutline
                      className="text-red-600 text-xl"
                      onClick={(e) => {
                        e.preventDefault();
                        setLogo(null);
                      }}
                    />
                  </span>
                )}
              </label>
            </div>
          </div>
          <div className="w-full mt-5">
            <label htmlFor="date">Event Description</label>
            <textarea
              name="description"
              rows={3}
              className="border border-gray-300 w-full p-2 rounded"
            />
          </div>
          <div>
            <button className="w-full mt-10 bg-black py-3 text-center text-white font-bold rounded">
              {isPending ? <ClipLoader color="white" size={21} /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
