import { createContext } from "react";
import { GameContextProps } from "../../models/GameModel";
export const GameContext = createContext<GameContextProps>(
  {} as GameContextProps,
);
