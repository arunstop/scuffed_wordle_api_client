import _ from "lodash";
import { ApiActionTypes, ApiState } from "../../models/ApiModel";

// REDUCER aka mutation in vuex
export const apiReducers = (
  state: ApiState,
  action: ApiActionTypes,
): ApiState => {
  // destructure
  // get count form state
  const { phrase } = state;
  const { type } = action;
  // determine which action type
  switch (type) {
    case "PHRASE_ADD": {
      const appendedList = [...phrase.list, action.newPhrase];
      console.log(appendedList);
      return {
        ...state,
        phrase: { ...phrase, list: appendedList },
      };
    }
    case "PHRASE_EDIT": {
      const editedList = _.map(phrase.list, (phraseItem) => {
        // change a the targeted item with the new updated one
        if (phraseItem.id === action.phrase.id) {
          return action.phrase;
        }
        return phraseItem;
      });
      return { ...state, phrase: { ...phrase, list: editedList } };
    }
    case "PHRASE_DELETE": {
      // Updated phrase list after delete
      const trimmedList = _.filter(
        phrase.list,
        (item) => item.id !== action.phraseId,
      );
      return { ...state, phrase: { ...phrase, list: trimmedList } };
    }
    default:
      return state;
  }
};
