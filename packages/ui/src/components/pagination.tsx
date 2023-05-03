import { useState } from "react";
import ReactPaginate from "react-paginate";

type PaginatedItemsProps = {
  itemsPerPage: number;
  totalRecords: number;
  onPageChange: (pageNumOnChange: number) => void;
};

export default function PaginatedItems({
  itemsPerPage,
  totalRecords,
  onPageChange,
}: PaginatedItemsProps) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = Math.ceil(totalRecords / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % totalRecords;
    setItemOffset(newOffset);
    onPageChange(event.selected + 1);
  };

  return (
    <div className="text-white my-2 justify-end">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount || 1}
        containerClassName="flex items-center gap-2 my-2"
        activeClassName="bg-larch-dark_3 rounded-lg"
        pageClassName="cursor-pointer w-10 h-10 flex justify-center items-center font-normal rounded-md hover:bg-larch-pink"
        pageLinkClassName="cursor-pointer "
        previousClassName="cursor-pointer w-10 h-10 flex justify-center items-center rounded-s-xl h-10 font-normal bg-larch-pink"
        previousLinkClassName="cursor-pointer inline-block font-bold"
        nextClassName="w-10 h-10 cursor-pointer flex justify-center items-center rounded-e-xl font-normal bg-larch-pink"
        nextLinkClassName="cursor-pointer inline-block font-bold"
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
