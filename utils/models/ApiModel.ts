import { GameActionTypes } from "./GameModel";
import { PhraseAction, PhraseActionTypes, PhraseState } from "./PhraseModel";

// State
export interface ApiState {
  phrase: PhraseState;
}

// Action
export interface ApiAction {
  phrase: PhraseAction;
  //   game: GameAction;
}

export type ApiActionTypes = PhraseActionTypes | GameActionTypes;

// Context props
export type ApiContextProps = {
  state: ApiState;
  action: ApiAction;
};
