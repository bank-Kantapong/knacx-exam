import { useEffect, useState } from "react";
import { BookType } from "../Pages/PaginationHooks";

const usePagination = ({
  data,
  limit,
}: {
  data: BookType[];
  limit: number;
}) => {
  const [page, setPage] = useState<number>(1);
  const [dataList, setDataList] = useState<BookType[]>([]);

  useEffect(() => {
    if (data) {
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const newData = data?.slice(startIndex, endIndex);
      setDataList(newData);
    }
  }, [data, limit, page]);

  const handleChangePage = (current: number) => {
    setPage(current);
  };

  return { dataList, handleChangePage, page };
};

export default usePagination;
