import { useContext } from "react";
import { ApiContext } from "./ApiContext";

// Setting up Api hooks
export const useApiContext = () => useContext(ApiContext);
