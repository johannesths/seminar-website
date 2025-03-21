import { useEffect, useState } from "react";
import api from "../api/axios";

export interface Location {
  id: number;
  name: string;
  street: string;
  house_number: number;
  zip_code: number;
  city: string;
  remarks?: string;
  maps_url?: string;
}

export const useLocations = (limit: number) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLocations = async () => {
    try {
      const response = await api.get(`/locations/?limit=${limit}`);
      setLocations(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, [limit]);

  return { locations, loading, error };
};
