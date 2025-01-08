import { Card, Pagination, PaginationProps } from "antd";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import usePagination from "../hooks/usePagination";

const { Meta } = Card;

export interface BookType {
  id: number;
  title: string;
  description: string;
  image: string;
}

const QUANTITY = 50;
const LIMIT = 10;
const PaginationHooks = () => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isInitImage = useRef<boolean>(false);
  const { dataList, handleChangePage, page } = usePagination({
    data: books,
    limit: LIMIT,
  });

  const getImageList = useCallback(async () => {
    if (isLoading || isInitImage.current) return;

    setIsLoading(true);
    try {
      const { data } = await axios.get(
        `https://fakerapi.it/api/v2/books?_quantity=${QUANTITY}`
      );
      if (data) {
        // image url จาก api เสียเลยต้องฟิก image แทน
        const newData = data.data.map((bookItem: BookType) => ({
          ...bookItem,
          image: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
        }));
        setBooks(newData);
        setTotal(data.total);
        isInitImage.current = true;
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [isLoading]);

  useEffect(() => {
    getImageList();
  }, [getImageList]);

  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") {
      return (
        <button className="flex items-center justify-center px-2 bg-white rounded-md hover:bg-slate-100">
          <p className="font-semibold">Previous</p>
        </button>
      );
    }
    if (type === "next") {
      return (
        <button className="flex items-center justify-center px-2 bg-white rounded-md">
          <p className="font-semibold">Next</p>
        </button>
      );
    }
    return originalElement;
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Custom Hooks Pagination</h1>
      <div className="grid grid-cols-1 gap-4 p-4 overflow-auto border border-gray-200 rounded-md md:grid-cols-5 h-1/2 max-h-[500px]">
        {isLoading ? (
          <div className="text-center col-span-full">
            <p>Loading...</p>
          </div>
        ) : (
          <>
            {dataList?.map((bookItem: BookType) => (
              <Card
                key={bookItem.id}
                style={{ width: 240 }}
                cover={<img alt="image" src={bookItem.image} />}
                className="shadow-md"
              >
                <Meta
                  title={bookItem.title}
                  description={bookItem.description}
                />
              </Card>
            ))}
          </>
        )}
      </div>
      <div className="flex justify-end">
        <Pagination
          current={page}
          total={total}
          onChange={handleChangePage}
          itemRender={itemRender}
          className="custom-pagination"
        />
      </div>
    </div>
  );
};

export default PaginationHooks;
