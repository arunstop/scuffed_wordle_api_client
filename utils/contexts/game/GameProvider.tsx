import { nanoid } from "nanoid";
import React, { useReducer } from "react";
import {
  Game,
  GameAction,
  GameActionTypes,
  GameContextProps,
  GameState,
} from "../../models/GameModel";
import { MainChildren } from "../../models/GeneralModel";
import { GameContext } from "./GameContext";


const getInitialGameList = (): Game[] => {
  const idList: string[] = [];
  function getId(): string {
    const newId = nanoid();
    if (idList.includes(newId)) return getId();
    return newId;
  }
  for (let i = 0; i < 12; i++) {
    idList.push(getId());
  }

  return idList.map((id) => {
    return {
      id: id,
      name: `Game no.${Math.round(Math.random())}`,
      matrix: `5x5`,
      timeZone: "CET",
      utcOffset: 2,
      refreshInterval: [],
      playerList: [],
      // mode:string,
      createdBy: `User#${id.substring(0, 5)}`,
      editedBy: `User#${id.substring(0, 5)}`,
      dateCreated: Date.now().toString(),
      dateEdited: Date.now().toString(),
      status: "ON",
    } as Game;
  });
};

const INITIAL_STATE: GameState = {
  list: getInitialGameList(),
};

const reducer = (state: GameState, action: GameActionTypes) => {
  switch (action.type) {
    case "ADD":
      return state;
    case "EDIT":
      return state;
    case "DELETE":
      return state;
    case "CLEAR":
      return state;
    default:
      return state;
  }
};

export default function GamesProvider({ children }: MainChildren) {
  const [gameState, dispatch] = useReducer(reducer, INITIAL_STATE);

  const gameAction: GameAction = {
    add: (game: Game) => {
      dispatch({ type: "ADD", payload: game });
    },
    edit: (param: Game) => dispatch({ type: "EDIT", payload: param }),
    delete: (param: string) => dispatch({ type: "DELETE", payload: param }),
    clear: (param: string) => dispatch({ type: "CLEAR", payload: param }),
  };
  const value: GameContextProps = {
    state: gameState,
    action: gameAction,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}
