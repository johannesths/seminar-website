import { useEffect, useState } from 'react';
import api from '../api/axios';

export interface Seminar {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  category: string;
  location: string;
  url: string;
}

export const useSeminars = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSeminars = async () => {
    try {
      const response = await api.get('/seminars/');
      setSeminars(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeminars();
  }, []);

  return { seminars, loading, error};
};
