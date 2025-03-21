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
  location: Location;
}

export const useSeminars = (limit: number, offset: number) => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSeminars = async () => {
    try {
      const response = await api.get(
        `/seminars/?limit=${limit}&offset=${offset}`
      );
      setSeminars(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeminars();
  }, [limit, offset]);

  return { seminars, loading, error };
};
