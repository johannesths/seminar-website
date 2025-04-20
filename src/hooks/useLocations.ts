/**
 * useLocations.ts
 *
 * Data hook for fetching locations with a limit (maximum number
 * of locations to return).
 */

import { useEffect, useState } from "react";
import api from "../api/axios";

export interface Location {
  location_id: number;
  name: string;
  street: string;
  house_number: number;
  zip_code: number;
  city: string;
  remarks?: string;
  maps_url?: string;
}

export const useLocations = (limit: number) => {
  // States
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const controller = new AbortController();

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
    return () => controller.abort();
  }, [limit]);

  return { locations, loading, error };
};
