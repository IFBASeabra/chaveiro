import AuthContext from "@/contexts/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};