import { UiContext } from "./UiContext";
import { useContext } from "react";
import _ from "lodash";
import { UiCommand } from "../../models/UiModel";

export const useUiContext = () => {
  const {
    state,
    state: { command },
    action,
  } = useContext(UiContext);

  const sortedCommandList: UiCommand[] =
    command.recentlyUsedId === ""
      ? _.orderBy(command.list, ["title"], ["asc"])
      : _.orderBy(
          command.list,
          // List of objects
          // Can alternatively use name of the object as string too
          // ["lastUsedAt","title"],
          [(command) => command.lastUsedAt, "title"],
          // List of order of those objects
          ["desc", "asc"],
        );
  const recentlyUsedCommand: UiCommand | null =
    //   check if user has used command
    command.recentlyUsedId === ""
      ? null
      : //   check if there is anycommand with that the id, if not, return null
        _.find(command.list, (item) => item.id === command.recentlyUsedId) ||
        null;
  return {
    state,
    action,
    getters: {
      sortedCommandList: sortedCommandList,
      recentlyUsedCommand: recentlyUsedCommand,
    },
  };
};
