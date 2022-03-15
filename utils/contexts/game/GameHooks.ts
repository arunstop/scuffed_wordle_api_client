import { Game } from './../../models/GameModel';
import { useContext } from 'react';
import { GameContext } from './GameContext';
import _ from 'lodash';
export const useGameContext = () => {
    const { state, action } = useContext(GameContext);
    const { search, list } = state;
    function filter(game: Game, keyword: string): boolean {
        const { name, matrix, createdBy, refreshInterval, timeZone } = game;
        // check if keyword included in props
        const includesIn = (data: string | string[]): boolean => {
            // check if data is string or array of string `string[]`
            const typeCheckedData = (typeof (data) === 'string' ? data.toLowerCase() : data);
            return typeCheckedData.includes(keyword);
        };
        return includesIn(name) || includesIn(matrix) || includesIn(createdBy) || includesIn(refreshInterval) || includesIn(timeZone);
    };
    // check if state.search is not empty
    const isSearching: boolean = search !== "" || !_.isNull(search);
    // if state.search is empty/not searching, return the original state.list
    const searchedList = !isSearching ? list : _.filter(state.list, (game) => filter(game, state.search));
    return {
        state, action, getters: { searchedList, isSearching, isEmpty:_.isEmpty(list) },
    };
};