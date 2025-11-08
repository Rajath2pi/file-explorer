import { useMemo, useState } from "react";
import PaginationButton from "./pagination-button";

export default function PaginationControllers({currentPage, totalPages, handleCurrentPage}: any) {
    
    const MAX_VISIBLE_PAGES = 5;
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            handleCurrentPage(newPage);
        }
    };

    const visiblePages = useMemo(() => {
        const pages = [];
        let startPage = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
        let endPage = Math.min(totalPages, startPage + MAX_VISIBLE_PAGES - 1);

        if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
            startPage = Math.max(1, endPage - MAX_VISIBLE_PAGES + 1);
        }

        const renderedPages = [];
        if (startPage > 1) {
            renderedPages.push(1);
            if (startPage > 2) renderedPages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            renderedPages.push(i);
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) renderedPages.push('..'); // Use a distinct string for the second ellipsis
            if (endPage < totalPages) {
                // Check if the last page hasn't been added yet (important for edge cases near the end)
                if (renderedPages[renderedPages.length - 1] !== totalPages) {
                    renderedPages.push(totalPages);
                }
            }
        }

        // Filter out consecutive ellipses if they somehow appear (using different string helps prevent this)
        return renderedPages.filter((p, index, array) => !(p === '...' && array[index - 1] === '...'));

    }, [currentPage, totalPages]);

    return (
        <div className="flex flex-wrap justify-center items-center py-4 border-t border-gray-100">

            {/* Previous Button */}
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg mx-1 text-sm font-medium transition duration-200 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
            >
                &larr; Previous
            </button>

            {/* Dynamic Page Buttons */}
            <div id="pagination-controls" className="flex flex-wrap items-center">
                {visiblePages.map((pageNum: any, index: number) => (
                    <PaginationButton key={index} pageNum={pageNum} pageNow = {currentPage} handlePageChange = {handlePageChange}/>
                ))}
            </div>

            {/* Next Button */}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg mx-1 text-sm font-medium transition duration-200 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed bg-gray-100 text-gray-400' : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'}`}
            >
                Next &rarr;
            </button>
        </div>
    )
}