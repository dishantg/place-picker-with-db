import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setisFetching] = useState(false);
  const [error, setError] = useState(false);
  const [fetchedData, setfetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setisFetching(true);
      try {
        const data = await fetchFn();
        setfetchedData(data);
      } catch (error) {
        setError({
          message: error.message || "Failed to fetch data.",
        });
      }
      setisFetching(false);
    }
    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    fetchedData,
    setfetchedData,
    error,
  };
}
