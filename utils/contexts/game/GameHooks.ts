import { TimeZone } from "./../../models/TimeZoneModel";
import { Game, GameTimeZone, strGameMatrix } from "./../../models/GameModel";
import { useContext } from "react";
import { GameContext } from "./GameContext";
import _ from "lodash";
// import timeZoneListJson from "../../../public/timeZoneList.json";
import timeZoneListJson from "../../../public/timeZoneList2.json";
export const useGameContext = () => {
  const { state, action } = useContext(GameContext);
  const { search, list } = state;
  function filter(game: Game, keyword: string): boolean {
    const { name, matrix, createdBy, refreshInterval, timeZone } = game;
    // check if keyword included in props
    const includesIn = (data: string | string[]): boolean => {
      // check if data is string or array of string `string[]`
      const typeCheckedData =
        typeof data === "string" ? data.toLowerCase() : data;
      return typeCheckedData.includes(keyword);
    };
    return (
      includesIn(name) ||
      includesIn(strGameMatrix(matrix)) ||
      includesIn(createdBy) ||
      includesIn(refreshInterval) ||
      includesIn(JSON.stringify(timeZone))
    );
  }
  // check if state.search is not empty
  const isSearching: boolean = search.trim() !== "";
  const sortedList = _.orderBy(
    [...list],
    // Sort by :
    [(gameItem) => gameItem.dateEdited],
    // Order
    ["desc"],
  );
  // if state.search is empty/not searching, return the original state.list
  const searchedList = !isSearching
    ? sortedList
    : _.filter(state.list, (game) => filter(game, state.search));

  const timeZoneList: TimeZone[] = timeZoneListJson.map(
    (raw) =>
      ({
        value: raw.value,
        abbr: raw.abbr,
        offset: raw.offset,
        isDst: raw.isdst,
        text: raw.text,
        utc: raw.utc,
      } as TimeZone),
  );

  const getGameTimeZone = (timeZone: GameTimeZone): GameTimeZone => {
    const filteredTimeZone = timeZoneList.filter(
      (tzItem) =>
        tzItem.abbr === timeZone.abbr &&
        tzItem.offset === timeZone.offset &&
        tzItem.value === timeZone.value,
    );
    return filteredTimeZone[0];
  };
  // console.log(timeZoneList.length);
  return {
    state,
    action,
    getters: {
      searchedList: searchedList,
      isSearching,
      isEmpty: _.isEmpty(list),
      timeZoneList: _.slice(timeZoneList, 0, 100),
      getTimeZone: (timeZone: GameTimeZone | undefined) =>
        timeZone ? getGameTimeZone(timeZone) || null : null,
    },
  };
};
