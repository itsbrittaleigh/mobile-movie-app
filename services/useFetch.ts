import { useEffect, useState } from 'react';

export const useFetch = <T>(fetchFunction: () => Promise<T>, autofetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (autofetch) {
      fetchData();
    }
  }, [autofetch]);

  const fetchData = async () => {
    try {
      reset();
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setData(null);
    setLoading(true);
    setError(null);
  }

  return { data, loading, error, refetch: fetchData, reset };
};