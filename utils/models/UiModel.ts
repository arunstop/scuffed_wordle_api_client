import { ReactNode } from "react";
// State
export interface UiState {
  darkTheme: boolean;
  menuList: UiMenu[];
  menuOn: string;
  isDrawerOpen: boolean;
  isCommandPaletteOpen: boolean;
}

export interface UiMenu {
  id: string;
  title: string;
  type: UiMenuTypes;
  icon: ReactNode;
}

export type UiMenuTypes = "MODAL" | "PAGE";

// Action
export interface UiAction {
  toggleDarkTheme: (value: boolean) => void;
  selectMenu: (menuId: string) => void;
  toggleDrawer: (value: boolean) => void;
  toggleCommandPalette: (value: boolean) => void;
}

// Action types
export type UiActionTypes =
  | { type: "TOGGLE_DARK_THEME"; payload: { value: boolean } }
  | { type: "SELECT_MENU"; payload: { menuId: string } }
  | { type: "TOGGLE_DRAWER"; payload: { value: boolean } }
  | { type: "TOGGLE_COMMAND_PALETTE"; payload: { value: boolean } };

export type UiContextProps = {
  state: UiState;
  action: UiAction;
};
