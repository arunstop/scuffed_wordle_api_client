import { useContext } from "react";
import { CounterContext } from "./CounterContext";

// Setting up counter hooks
export const useCountContext = () => useContext(CounterContext);
