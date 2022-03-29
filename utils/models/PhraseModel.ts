export interface PhraseState {
  list: Phrase[];
  search: string;
}

export interface Phrase {
  id: string;
  type: PhraseType;
  text: string;
}

export enum PhraseType {
  WELCOME = "WELCOME",
  LOSE = "LOSE",
  WIN = "WIN",
}

// export type PhraseType = "WELCOME" | "LOSE" | "WIN";

export interface PhraseAction {
  load: () => void;
  add: (newPhrase: Phrase) => void;
  edit: (phrase: Phrase) => void;
  delete: (phraseId: string) => void;
}
export type PhraseActionTypes =
  | { type: "PHRASE_LOAD"; phraseList: Phrase[] }
  | { type: "PHRASE_ADD"; newPhrase: Phrase }
  | { type: "PHRASE_EDIT"; phrase: Phrase }
  | { type: "PHRASE_DELETE"; phraseId: string }
  | { type: "PHRASE_CLEAR"; phraseIdList?: string[] }
  | { type: "PHRASE_SEARCH"; keyword: string };
