import { ReactNode } from 'react';
// State
export interface UiState {
    darkTheme: boolean;
    menuList: UiMenu[];
    menuOn: string;
}

export interface UiMenu {
    id: string;
    title: string;
    type: UiMenuTypes;
    icon: ReactNode;
}

export type UiMenuTypes = | 'MODAL' | 'PAGE';

// Action
export interface UiAction {
    toggleDarkTheme: (darkTheme: boolean) => void;
    selectMenu: (menuId: string) => void;
}

// Action types
export type UiActionTypes =
    | { type: 'TOGGLE_DARK_THEME', payload: boolean; }
    | { type: 'SELECT_MENU', payload: string; };

export type UiContextProps = {
    state: UiState,
    action: UiAction,
};