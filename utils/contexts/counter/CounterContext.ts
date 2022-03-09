import { createContext } from "react";
import { CounterContextProps } from "../../models/CounterModel";

// Initialize context type
export const CounterContext = createContext<CounterContextProps>(
  {} as CounterContextProps
);
