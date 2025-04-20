/**
 * useAuth.ts
 *
 * Hook for validating if an user is logged in as an admin.
 */

import { useState, useEffect } from "react";
import api from "../api/axios";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const checkAuth = async () => {
    try {
      await api.get("/admin/check"); // backend should return dict if valid
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth(); // check on load
  }, []);

  return { isAuthenticated, checkAuth };
};
