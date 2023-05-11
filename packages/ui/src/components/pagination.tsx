/*
 * Copyright (C) Zeeve Inc.
 * This file is part of Larch.
 * Larch is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * Larch is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with Larch.  If not, see <http://www.gnu.org/licenses/>.
 */

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
        pageLinkClassName="cursor-pointer w-10 h-10 flex justify-center items-center font-normal rounded-md hover:bg-larch-pink"
        // previousClassName="cursor-pointer w-10 h-10 flex justify-center items-center rounded-s-xl h-10 font-normal bg-larch-pink"
        previousLinkClassName="w-10 h-10 flex justify-center items-center rounded-s-xl h-10 font-normal bg-larch-pink"
        // nextClassName="w-10 h-10 cursor-pointer flex justify-center items-center rounded-e-xl font-normal bg-larch-pink"
        nextLinkClassName="w-10 h-10 flex justify-center items-center rounded-e-xl h-10 font-normal bg-larch-pink"
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
