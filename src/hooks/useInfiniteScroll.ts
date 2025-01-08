import { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";

interface BookType {
  id: number;
  title: string;
  description: string;
  isbn: string;
}

interface UseInfiniteScrollParams {
  apiUrl: string;
  limit: number;
  max: number;
}

const useInfiniteScroll = ({ apiUrl, limit, max }: UseInfiniteScrollParams) => {
  const [items, setItems] = useState<BookType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const fetchItems = useCallback(async () => {
    if (isLoading || !hasMore || items.length >= max) return;

    setIsLoading(true);
    try {
      const response = await axios.get(`${apiUrl}?_quantity=${limit}`);
      if (response && response.data.data.length > 0) {
        setItems((prevItems) => [...prevItems, ...response.data.data]);

        if (items.length + response.data.total >= max) {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
    setIsLoading(false);
  }, [apiUrl, hasMore, isLoading, items.length, limit, max]);

  useEffect(() => {
    const container = containerRef.current;

    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && items.length < max) {
        fetchItems();
      }
    };

    if (container) {
      observerRef.current = new IntersectionObserver(handleObserver, {
        root: container,
        rootMargin: "0px",
        threshold: 1.0,
      });

      const sentinel = document.createElement("div");
      sentinel.setAttribute("id", "sentinel");
      sentinel.style.height = "1px";
      container.appendChild(sentinel);
      observerRef.current.observe(sentinel);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
      if (container) {
        const sentinel = container.querySelector("#sentinel");
        if (sentinel) container.removeChild(sentinel);
      }
    };
  }, [fetchItems, items.length, max]);

  return {
    items,
    isLoading,
    hasMore,
    containerRef,
  };
};

export default useInfiniteScroll;