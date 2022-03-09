import { useReducer } from "react";
import {
  CounterAction,
  CounterActionTypes,
  CounterContextProps,
  CounterState,
} from "../../models/CounterModel";
import { GeneralContextChildren } from "../../models/GeneralModel";
import { CounterContext } from "./CounterContext";

const INITIAL_STATE: CounterState = {
  count: 0,
};

// REDUCER aka mutation in vuex
const reducer = (state: CounterState, action: CounterActionTypes) => {
  // destructure
  // get count form state
  const { count } = state;
  const { type, payload } = action;
  // determine which action type
  switch (type) {
    case "INCREASE":
      return { count: count + payload };
    case "DECREASE":
      // count cannot be less than 0
      if (count <= 0) return state;
      return { count: count - payload };
    default:
      return state;
  }
};

export const CounterProvider = ({ children }: GeneralContextChildren) => {
  const [counterState, dispatch] = useReducer(reducer, INITIAL_STATE);
  // set initial value
  const counterAction: CounterAction = {
    increase: (count: number) => {
      dispatch({ type: "INCREASE", payload: count });
    },
    decrease: (count: number) => {
      dispatch({ type: "DECREASE", payload: count });
    },
  };

  const value: CounterContextProps = {
    state: counterState,
    action: counterAction,
  };
  return (
    <CounterContext.Provider value={value}>
      <>{children}</>
    </CounterContext.Provider>
  );
};
