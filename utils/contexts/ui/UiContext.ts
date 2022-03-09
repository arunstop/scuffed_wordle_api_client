import { createContext } from "react";
import { UiContextProps } from "../../models/UiModel";


export const UiContext = createContext<UiContextProps>({} as UiContextProps);
