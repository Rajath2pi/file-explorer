export default function PaginationButton({ pageNum, pageNow, handlePageChange }: any){
        const isActive = pageNum === pageNow;
        const baseClasses = 'p-2 rounded-lg mx-1 text-sm font-medium transition duration-200';
        const activeClasses = 'bg-indigo-600 text-white shadow-lg';
        const inactiveClasses = 'bg-gray-200 text-gray-700 hover:bg-indigo-100 hover:text-indigo-700 hover:shadow-md';

        if (pageNum === '...' || pageNum === '..') {
            return (
                <span className="p-2 mx-1 text-sm font-medium text-gray-500 cursor-default">
                    {/* Ellipsis */}
                    ...
                </span>
            );
        }

        return (
            <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                aria-current={isActive ? 'page' : undefined}
            >
                {pageNum}
            </button>
        );
    };