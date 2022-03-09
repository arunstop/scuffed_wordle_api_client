// State
export interface UiState {
    darkTheme: boolean;
}

// Action
export interface UiAction {
    toggleDarkTheme: (darkTheme: boolean) => void;
}

// Action types
export type UiActionTypes =
    | { type: 'TOGGLE_DARK_THEME', payload: boolean; };

export type UiContextProps = {
    state: UiState,
    action: UiAction,
};