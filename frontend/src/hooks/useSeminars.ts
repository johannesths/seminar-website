/**
 * useSeminars.ts
 *
 * Provides a data hook to retrieve seminars with an offset and limit.
 * Also retrieves the total number of seminars.
 */

import { useEffect, useState } from "react";
import api from "../api/axios";
import { Location } from "./useLocations";

export interface Seminar {
  seminar_id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  url: string;
  image_name: string;
  max_participants: number;
  participants_count: number;
  price: number;
  location: Location;
}

export const useSeminars = (limit: number, offset: number) => {
  // States
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState<number>(1);

  const controller = new AbortController();

  const fetchSeminars = async () => {
    try {
      const countResponse = await api.get(`/seminars/count`);
      setCount(countResponse.data);

      const seminarsResponse = await api.get(
        `/seminars/?limit=${limit}&offset=${offset}`
      );
      setSeminars(seminarsResponse.data);
    } catch (err: any) {
      if (err.name !== "CanceledError") {
        setError(err.message);
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeminars();
    return () => controller.abort();
  }, [limit, offset]);

  return { seminars, count, loading, error };
};
