import { createContext } from "react";

import type { RoomsContextType } from "@/types/rooms";

const RoomsContext = createContext<RoomsContextType | undefined>(undefined)

export default RoomsContext