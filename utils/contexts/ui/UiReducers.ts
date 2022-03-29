import _ from "lodash";
import moment from "moment";
import { UiActionTypes, UiState } from "../../models/UiModel";

export const uiReducers = (state: UiState, action: UiActionTypes): UiState => {
  // const { darkTheme } = state;
  const { type, payload } = action;
  switch (type) {
    case "TOGGLE_DARK_THEME":
      return { ...state, darkTheme: payload.value };
    case "SELECT_MENU":
      return { ...state, menu: { ...state.menu, active: payload.menuId } };
    case "TOGGLE_DRAWER":
      return { ...state, menu: { ...state.menu, isDrawerOpen: payload.value } };
    case "TOGGLE_COMMAND_PALETTE":
      return {
        ...state,
        command: { ...state.command, isPaletteOpen: payload.value },
      };
    case "RUN_COMMAND": {
      const commandId = payload.commandId;
      // get the targeted command
      const targetedCommand = _.find(
        state.command.list,
        (command) => command.id === commandId,
      );
      // clone the list from the state then update it
      const updatedCommandList = _.map(state.command.list, (command) => {
        if (targetedCommand && command.id === commandId) {
          return { ...targetedCommand, lastUsedAt: moment.now().toString() };
        }
        return command;
      });
      // apply changes
      return {
        ...state,
        command: {
          ...state.command,
          list: updatedCommandList,
          recentlyUsedId: commandId,
        },
      };
    }
    default:
      return state;
  }
};
