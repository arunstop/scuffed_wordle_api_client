import { useContext } from 'react';
import { GameContext } from './GameContext';
export const useGameContext = () => {
    const { state, action } = useContext(GameContext);
    return {
        state, action,
    };
};