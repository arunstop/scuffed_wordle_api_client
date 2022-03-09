import { UiContext } from './UiContext';
import { useContext } from "react";

export const useUi = () => {
    useContext(UiContext);
};