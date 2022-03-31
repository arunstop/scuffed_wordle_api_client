import _ from "lodash";
import { nanoid } from "nanoid";
import React, { useReducer } from "react";
import {
  Game,
  GameAction,
  GameActionTypes,
  GameContextProps,
  GameDifficulty,
  GameState,
} from "../../models/GameModel";
import { MainChildren } from "../../models/GeneralModel";
import { GameContext } from "./GameContext";

export const generateGameData = (id?: string): Game => {
  // check generate id if no param
  id = id || nanoid();
  return {
    id: id,
    name: `Game #${Math.round(Math.random() * 100)}`,
    matrix: { x: 5, y: 6, z: 1 },
    difficulty: GameDifficulty.EASY,
    timeZone: { value: "", abbr: "", offset: 0 },
    utcOffset: 2,
    refreshInterval: [],
    playerList: [],
    bannedWordList: [],
    completedWordList: [],
    // mode:string,
    createdBy: `User#${id.substring(0, 5)}`,
    editedBy: `User#${id.substring(0, 5)}`,
    dateCreated: Date.now().toString(),
    dateEdited: Date.now().toString(),
    status: "ON",
  };
};

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

  return idList.map((id) => generateGameData(id));
};

const INITIAL_STATE: GameState = {
  list: getInitialGameList(),
  search: "",
};

const reducer = (state: GameState, action: GameActionTypes): GameState => {
  switch (action.type) {
    case "ADD": {
      const newData = action.newGame;
      return { ...state, list: [...state.list, newData] };
    }
    case "EDIT": {
      const id = action.editedGame.id;
      // const editedData = action.editedGame;
      // remove the data with the id from the state,
      // then add the editedData
      return {
        ...state,
        list: [
          ...state.list.filter((game) => game.id !== id),
          action.editedGame,
        ],
      };
    }
    case "DELETE": {
      // filter out the data that has id equals with gameId
      const id = action.gameId;
      return { ...state, list: state.list.filter((game) => game.id !== id) };
    }
    case "CLEAR": {
      // check if payload contains gameIdList
      const { gameIdList } = action;
      if (gameIdList) {
        // clear selected items from list
        // by checking if each of the game's id
        // is NOT included in action.gameIdList
        const clearedItemList = _.filter(
          state.list,
          (game) => !gameIdList.includes(game.id),
        );
        return { ...state, search: "", list: clearedItemList };
      }
      // if has no gameIdList
      // empty the game list
      return { ...state, search: "", list: [] };
    }
    case "SEARCH":
      // change search keyword
      return { ...state, search: action.keyword };
    default:
      return state;
  }
};

export default function GamesProvider({ children }: MainChildren) {
  const [gameState, dispatch] = useReducer(reducer, INITIAL_STATE);

  const gameAction: GameAction = {
    add: (game: Game) => {
      dispatch({ type: "ADD", newGame: game });
    },
    edit: (game: Game) => dispatch({ type: "EDIT", editedGame: game }),
    delete: (gameId: string) => dispatch({ type: "DELETE", gameId: gameId }),
    clear: (gameIdList?: string[]) =>
      dispatch({ type: "CLEAR", gameIdList: gameIdList }),
    search: (keyword: string) => dispatch({ type: "SEARCH", keyword }),
  };
  const value: GameContextProps = {
    state: gameState,
    action: gameAction,
  };
  return (
    <GameContext.Provider value={value}>
      <>{children}</>
    </GameContext.Provider>
  );
}
