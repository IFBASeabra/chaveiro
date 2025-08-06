import { useContext } from "react";

import RoomsContext from "@/contexts/RoomsContext";

export const useRooms = () => {
  const ctx = useContext(RoomsContext);

  if (!ctx) throw new Error('useAuth must be inside RoomsProvider');
  
  return ctx;
};