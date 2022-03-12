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
}

// Action Types
export type GameActionTypes = | { type: 'ADD', payload: Game; }
    | { type: 'EDIT', payload: Game, }
    | { type: 'DELETE', payload: string, }
    | { type: 'CLEAR', payload: string, };

export interface GameAction {
    add: (game: Game) => void;
    edit: (game: Game) => void;
    delete: (id: string) => void;
    clear: (param: string) => void;
}



// Context Props
export type GameContextProps = {
    state: GameState;
    action: GameAction;
};