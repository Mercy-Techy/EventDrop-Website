import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const Pagination = ({
  data,
  page,
  setPage,
}: {
  data: any;
  page: number;
  setPage: (x: number) => void;
}) => {
  const nextPage = () => {
    if (page < data?.totalPages) setPage(page + 1);
    return;
  };
  const prevPage = () => {
    if (page > 1) setPage(page - 1);
    return;
  };
  return (
    <div className="flex justify-center items-center mt-16">
      <div className=" flex items-center gap-2">
        <div className="flex items-center gap-8">
          <button
            className={`${
              page === 1 ? "bg-gray-300 text-black" : "bg-black text-white"
            } text-lg font-bold p-2 rounded-lg`}
          >
            <MdNavigateBefore onClick={prevPage} />
          </button>
          <button className="">{page}</button>
          <button
            className={`${
              data?.totalPages === page
                ? "bg-gray-300 text-black"
                : "bg-black text-white"
            } text-lg font-bold p-2 rounded-lg`}
          >
            <MdNavigateNext onClick={nextPage} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
