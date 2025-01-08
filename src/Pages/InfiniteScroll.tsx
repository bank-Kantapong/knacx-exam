import useInfiniteScroll from "../hooks/useInfiniteScroll";

const LIMIT = 100;
const MAX = 300;

const InfiniteScroll = () => {
  const {
    items: books,
    isLoading,
    hasMore,
    containerRef,
  } = useInfiniteScroll({
    apiUrl: "https://fakerapi.it/api/v2/books",
    limit: LIMIT,
    max: MAX,
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Infinite Scroll</h1>
      <div
        ref={containerRef}
        className="grid grid-cols-1 gap-4 p-4 overflow-auto border border-gray-200 rounded-md md:grid-cols-3 h-1/2 max-h-[500px]"
      >
        {books.map((book, index) => (
          <div key={book.isbn} className="p-4 bg-white rounded-lg shadow">
            <h1 className="text-lg font-bold text-black">
              {index + 1}. {book.title}
            </h1>
            <p className="text-sm text-gray-600">{book.description}</p>
          </div>
        ))}
        {isLoading && (
          <div className="text-center col-span-full">
            <p>Loading...</p>
          </div>
        )}
        {!hasMore && (
          <p className="my-4 text-center text-gray-500 col-span-full">
            No more books to load.
          </p>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
