import { useContext } from 'react';
import { GameContext } from './GameContext';
export const useGameContext = () => useContext(GameContext);