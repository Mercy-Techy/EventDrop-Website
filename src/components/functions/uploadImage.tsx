import { IoCloseOutline, IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../../api/event";
import type { CustomError } from "../../api/auth";
import { queryClient } from "../../App";
import { ClipLoader } from "react-spinners";

const UploadImage = ({
  closeModal,
  eventId,
}: {
  closeModal: () => void;
  eventId: string;
}) => {
  const [image, setImage] = useState<File | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: uploadImage,
    onError: (data: CustomError) =>
      toast.error(data?.response?.data?.message || data?.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["events", "event", eventId] });
      toast.success(data?.message);
      return closeModal();
    },
  });

  const onSubmit = () => {
    const form = new FormData();
    form.append("image", image!);
    mutate({ form, eventId });
  };

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-60">
      <div className="bg-white mx-10 w-full md:w-3/4 lg:w-1/2 rounded max-h-[95vh] lg:max-h-full overflow-y-auto">
        <div className="flex justify-end m-4">
          <IoCloseSharp className="text-2xl" onClick={closeModal} />
        </div>
        <div className="text-center mt-10 text-2xl font-bold">Upload Image</div>
        <div className="p-10 md:px-16">
          <div className="w-full mt-5 lg:mt-0 relative">
            <input
              id="image"
              type="file"
              name="image"
              accept=".png,.jpg,.jpeg,image/png,image/jpeg"
              className="hidden"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />

            <label
              htmlFor="image"
              className="bg-gray-200 w-full h-10 rounded flex items-center justify-center cursor-pointer"
            >
              {image ? image.name : "Select Image"}
              {image && (
                <span>
                  <IoCloseOutline
                    className="text-red-600 text-xl"
                    onClick={(e) => {
                      e.preventDefault();
                      setImage(null);
                    }}
                  />
                </span>
              )}
            </label>
          </div>
          <div>
            <button
              className="w-full mt-10 bg-black py-3 text-center text-white font-bold rounded"
              onClick={onSubmit}
            >
              {isPending ? <ClipLoader color="white" size={21} /> : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
