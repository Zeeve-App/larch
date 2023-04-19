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
        nextLabel=' >'
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount || 1}
        containerClassName='flex my-2'
        activeClassName='bg-green rounded-lg'
        pageClassName='px-0 py-1 rounded-lg font-normal hover:bg-cyan-700'
        pageLinkClassName='px-4 py-2'
        previousClassName='px-2 py-1 rounded-lg font-normal hover:bg-cyan-700'
        previousLinkClassName='px-2 py-1'
        nextClassName='px-2 py-1 rounded-lg font-normal hover:bg-cyan-700'
        nextLinkClassName='px-2 py-1'
        previousLabel='<  '
        renderOnZeroPageCount={null}
      />
    </div>
  );
}
