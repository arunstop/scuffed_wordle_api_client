import { createContext } from "react";
import { ApiContextProps } from "../../models/ApiModel";

// Initialize context type
export const ApiContext = createContext<ApiContextProps>({} as ApiContextProps);
