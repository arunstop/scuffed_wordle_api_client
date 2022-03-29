import { nanoid } from "nanoid";
import { useReducer } from "react";
import { ApiAction, ApiContextProps, ApiState } from "../../models/ApiModel";
import { MainChildren } from "../../models/GeneralModel";
import { Phrase, PhraseType } from "../../models/PhraseModel";
import { ApiContext } from "./ApiContext";
import { apiReducers } from "./ApiReducers";

const getPhraseList = (length: number): Phrase[] => {
  const sampleList: Phrase[] = [];

  for (let i = 0; i < length; i++) {
    let type: PhraseType = PhraseType.LOSE;

    if (i % 2 == 0) {
      type = PhraseType.WIN;
    } else if (i % 3 == 0) {
      type = PhraseType.WELCOME;
    }
    sampleList.push({
      id: nanoid(),
      text: nanoid(),
      type: type,
    });
  }
  return sampleList;
};

const INITIAL_STATE: ApiState = {
  phrase: {
    list: getPhraseList(16),
    search: "",
  },
};

export const ApiProvider = ({ children }: MainChildren) => {
  const [ApiState, dispatch] = useReducer(apiReducers, INITIAL_STATE);
  // set initial value
  const ApiAction: ApiAction = {
    phrase: {
      load: () => {},
      add: (newPhrase: Phrase) => {
        console.log("ad");
        dispatch({ type: "PHRASE_ADD", newPhrase });
      },
      edit: (phrase: Phrase) => {
        dispatch({ type: "PHRASE_EDIT", phrase });
      },
      delete: (phraseId: string) => {
        dispatch({ type: "PHRASE_DELETE", phraseId });
      },
    },
  };

  const value: ApiContextProps = {
    state: ApiState,
    action: ApiAction,
  };
  return (
    <ApiContext.Provider value={value}>
      <>{children}</>
    </ApiContext.Provider>
  );
};
