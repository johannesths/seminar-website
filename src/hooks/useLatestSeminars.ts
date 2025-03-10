import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Seminar } from './useSeminars';

export const useLatestSeminars = (amount: number) => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLatestSeminars = async () => {
    try {
      const response = await api.get(`/seminars/latest/${amount}`);
      setSeminars(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestSeminars();
  }, []);

  return { seminars, loading, error};
};
