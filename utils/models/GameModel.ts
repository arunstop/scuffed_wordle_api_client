import { DbStatus } from "./DatabaseModel";

// Data
export interface Game {
    id: string;
    name: string;
    matrix: string;
    timeZone: string;
    utcOffset: number;
    refreshInterval: string[];
    playerList: string[];
    // mode:string;
    createdBy: string;
    editedBy: string;
    dateCreated: string;
    dateEdited: string;
    status: DbStatus;
}

// State
export interface GameState {
    list: Game[];
    search: string;
}

// Action Types
export type GameActionTypes = | { type: 'ADD', newGame: Game; }
    | { type: 'EDIT', editedGame: Game, }
    | { type: 'DELETE', gameId: string, }
    | { type: 'CLEAR', gameIdList?: string[], }
    | { type: 'SEARCH', keyword: string, };

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