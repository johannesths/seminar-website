import { useEffect, useState } from "react";
import api from "../api/axios";

export interface Participant {
  participant_id: number;
  firstname: string;
  lastname: string;
  email: string;
  remarks?: string;
  token: string;
}

export const useParticipants = (id: number) => {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const controller = new AbortController();

  const fetchParticipants = async () => {
    try {
      const response = await api.get(`/seminars/${id}/participants`);
      setParticipants(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
    return () => controller.abort();
  }, [id]);

  return { participants, setParticipants, loading, error };
};
