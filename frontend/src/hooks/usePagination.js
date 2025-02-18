import { useState } from "react";

const usePagination = (data, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return { currentItems, totalPages, paginate, currentPage };
};


export default usePagination;