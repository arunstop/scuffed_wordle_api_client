import { useTheme } from "next-themes";
import { useReducer } from "react";
import { GeneralContextChildren as ContextChildren } from "../../models/GeneralModel";
import {
  UiAction,
  UiActionTypes,
  UiContextProps,
  UiState,
} from "../../models/UiModel";
import { UiContext } from "./UiContext";

const INITIAL_STATE: UiState = {
  darkTheme: false,
};

const reducer = (state: UiState, action: UiActionTypes) => {
  const { darkTheme } = state;
  const { type, payload } = action;
  switch (type) {
    case "TOGGLE_DARK_THEME":
      return { ...state, darkTheme: payload };
    default:
      return state;
  }
};

export const UiProvider = ({ children }: ContextChildren) => {
  const { theme, setTheme } = useTheme();

  const [uiState, dispatch] = useReducer(reducer, {
    ...INITIAL_STATE,
    darkTheme: theme === "business",
  });
  const uiAction: UiAction = {
    toggleDarkTheme: (darkTheme: boolean) => {
      setTheme(darkTheme ? "business" : "corporate");
      dispatch({
        type: "TOGGLE_DARK_THEME",
        payload: darkTheme,
      });
    },
  };
  const value: UiContextProps = {
    state: uiState,
    action: uiAction,
  };
  return (
    <UiContext.Provider value={value}>
      <>{children}</>
    </UiContext.Provider>
  );
};
