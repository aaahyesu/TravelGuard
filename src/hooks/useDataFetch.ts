import { useState, useEffect } from "react";

interface FetchResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
}

const useDataFetching = <T>(
  fetchFunction: () => Promise<T[]>
): FetchResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchFunction();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchFunction]);

  return { data, loading, error };
};

export default useDataFetching;
