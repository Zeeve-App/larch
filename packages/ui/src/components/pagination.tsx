import { useState } from 'react';
import ReactPaginate from 'react-paginate';

type PaginatedItemsProps = {
  itemsPerPage: number,
  totalRecords: number,
  onPageChange: (pageNumOnChange: number) => void,
};

export default function PaginatedItems({ itemsPerPage, totalRecords, onPageChange }: PaginatedItemsProps) {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const pageCount = Math.ceil(totalRecords / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % totalRecords;
    setItemOffset(newOffset);
    onPageChange(event.selected + 1);
  };

  return (
    <div className='text-white justify-end'>
      <ReactPaginate
        breakLabel='...'
        nextLabel='next >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel='< previous'
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
