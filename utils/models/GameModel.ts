import { DbStatus } from "./DatabaseModel";

// Data
export interface Game {
  id: string;
  name: string;
  matrix: GameMatrix;
  difficulty: GameDifficulty;
  timeZone: GameTimeZone;
  utcOffset: number;
  refreshInterval: string[];
  playerList: string[];
  bannedWordList: string[];
  completedWordList: string[];
  // mode:string;
  createdBy: string;
  editedBy: string;
  dateCreated: string;
  dateEdited: string;
  status: DbStatus;
}

export interface GameTimeZone {
  value: string;
  abbr: string;
  offset: number;
}

export interface GameMatrix {
  x: number;
  y: number;
  z: number;
}

export enum GameDifficulty {
  EASY = "EASY",
  NORMAL = "NORMAL",
  HARD = "HARD",
}

export const strGameMatrix = ({ x, y, z }: GameMatrix): string =>
  `${x}x${y}x${z}`;

// State
export interface GameState {
  list: Game[];
  search: string;
}

// Action Types
export type GameActionTypes =
  | { type: "ADD"; newGame: Game }
  | { type: "EDIT"; editedGame: Game }
  | { type: "DELETE"; gameId: string }
  | { type: "CLEAR"; gameIdList?: string[] }
  | { type: "SEARCH"; keyword: string };

// Actions
export interface GameAction {
  add: (game: Game) => void;
  edit: (game: Game) => void;
  delete: (gameId: string) => void;
  clear: (gameIdList?: string[]) => void;
  search: (keyword: string) => void;
}

// Context Props
export type GameContextProps = {
  state: GameState;
  action: GameAction;
};
