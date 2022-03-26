import { ReactNode } from "react";
// State
export interface UiState {
  darkTheme: boolean;
  menu: {
    list: UiMenu[];
    active: string;
    isDrawerOpen: boolean;
  };
  command: {
    isPaletteOpen: boolean;
    list: UiCommand[];
    recentlyUsed: UiCommandId;
  };
}

export interface UiCommand {
  id: UiCommandId;
  title: string;
  desc: string;
  type: UiCommandTypes;
  icon: ReactNode;
  lastUsedAt: string;
  action: () => void;
}
export type UiCommandId = string;

export type UiCommandTypes = "NAVIGATION" | "ALTERATION" | "OTHER";

// UiMenu
export interface UiMenu {
  id: string;
  title: string;
  type: UiMenuTypes;
  icon: ReactNode;
}

export type UiMenuTypes = "MODAL" | "PAGE";

// Action
export interface UiAction {
  toggleDarkTheme: () => void;
  selectMenu: (menuId: string) => void;
  toggleDrawer: () => void;
  toggleCommandPalette: () => void;
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
