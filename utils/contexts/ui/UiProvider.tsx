import { useTheme } from "next-themes";
import { useEffect, useReducer } from "react";
import { MainChildren as ContextChildren } from "../../models/GeneralModel";
import { slugify } from "../../models/GlobalModel";
import {
  UiAction,
  // UiActionTypes,
  UiCommand,
  UiContextProps,
  UiMenu,
  UiState,
} from "../../models/UiModel";
import { UiContext } from "./UiContext";
import {
  MdOutlineSpaceDashboard,
  MdOutlineErrorOutline,
  MdOutlineDarkMode,
  MdRefresh,
} from "react-icons/md";
import { GoBook } from "react-icons/go";
import { HiOutlineCog, HiOutlineLogout } from "react-icons/hi";
import { RiApps2Line } from "react-icons/ri";
import { BsChatQuote } from "react-icons/bs";
import { NextRouter, useRouter } from "next/router";
import moment from "moment";
import { FiExternalLink, FiSun } from "react-icons/fi";
import {
  ID_DIALOG_OVERLAY,
  ID_MODAL_LOGOUT,
} from "../../helpers/constants/ConstantIds";
// import _ from "lodash";
import { uiReducers } from "./UiReducers";
// import { ID_MAIN_DRAWER } from "../../helpers/constants/ConstantIds";

const getInitialMenuList = (): UiMenu[] => {
  const menuList = [
    {
      title: "Dashboard",
      type: "PAGE",
      icon: <MdOutlineSpaceDashboard />,
    },
    { title: "Dictionary", type: "PAGE", icon: <GoBook /> },
    { title: "Games", type: "PAGE", icon: <RiApps2Line /> },
    {
      title: "Issue Reports",
      type: "PAGE",
      icon: <MdOutlineErrorOutline />,
    },
    { title: "Phrases", type: "PAGE", icon: <BsChatQuote /> },
    { title: "Settings", type: "PAGE", icon: <HiOutlineCog /> },
    {
      title: "Logout",
      type: "MODAL",
      icon: <HiOutlineLogout className="rotate-180" />,
    },
  ];

  // Giving each child on the menuList an id
  const menuWithIdList = (): UiMenu[] => {
    return menuList.map(
      (menu) =>
        ({
          id: slugify(menu.title),
          title: menu.title,
          type: menu.type,
          icon: menu.icon,
        } as UiMenu), // Cast the anonymous object into UiMenu
    );
  };

  return menuWithIdList();
};

const INITIAL_STATE: UiState = {
  darkTheme: false,
  menu: {
    list: getInitialMenuList(),
    active: "",
    isDrawerOpen: false,
  },
  // menuOn: getInitialMenuList()[0].id,
  command: {
    isPaletteOpen: false,
    list: [],
    recentlyUsedId: "",
  },
};

export const UiProvider = ({ children }: ContextChildren) => {
  // HYDRATION ERROR
  const { theme, setTheme } = useTheme();
  const router: NextRouter = useRouter();

  // Creating command list
  function getCommandList(): UiCommand[] {
    const navigationCommandList: UiCommand[] = [
      ...getInitialMenuList().map((nav) => {
        const commandTitle =
          nav.type === "MODAL"
            ? `Execute: ${nav.title}`
            : `Go to: ${nav.title} page`;
        return {
          id: `cmd-nav-page-${nav.id}`,
          title: commandTitle,
          desc: "",
          lastUsedAt: moment.now().toString(),
          type: "NAVIGATION",
          icon: nav.icon,
          action: () => {
            if (nav.type === "PAGE") {
              router.push(`/${nav.id}`);
            } else {
              document.getElementById(ID_MODAL_LOGOUT)?.click();
            }
          },
        } as UiCommand;
      }),
      {
        id: `cmd-nav-open-game-app`,
        title: `Go to: Game app`,
        desc: `Will open the Game app in a new tab -> https://scuffed-wordle.web.app/`,
        lastUsedAt: moment.now().toString(),
        type: "NAVIGATION",
        icon: <FiExternalLink />,
        action: () => window.open("https://scuffed-wordle.web.app/", "_blank"),
      },
    ];
    const alterationCommandList: UiCommand[] = [
      {
        id: `cmd-alter-reload`,
        title: `Execute: Reload app`,
        desc: ``,
        lastUsedAt: moment.now().toString(),
        type: "ALTERATION",
        icon: <MdRefresh />,
        action: () => router.reload(),
      },
      {
        id: `cmd-alter-light-mode-on`,
        title: `Execute: Turn on the Light Mode`,
        desc: `Turning on Light Mode meaning, the app appearance will be as bright as daylight. 
        Suited for day-time use. If light mode is already on, this action is futile.`,
        lastUsedAt: moment.now().toString(),
        type: "ALTERATION",
        icon: <FiSun />,
        action: () => toggleDarkTheme(false),
      },
      {
        id: `cmd-alter-dark-mode-on`,
        title: `Execute: Turn on the Dark Mode`,
        desc: `Turning on Dark Mode meaning, the app appearance will be as dim as night. 
        Suited for night-time use. If dark mode is already on, this action is futile.`,
        lastUsedAt: moment.now().toString(),
        type: "ALTERATION",
        icon: <MdOutlineDarkMode />,
        action: () => toggleDarkTheme(true),
      },
    ];
    return [...navigationCommandList, ...alterationCommandList];
  }

  const [uiState, dispatch] = useReducer(uiReducers, {
    ...INITIAL_STATE,
    command: {
      ...INITIAL_STATE.command,
      list: getCommandList(),
    },
    darkTheme: theme === "business",
  });

  function toggleDarkTheme(value: boolean) {
    dispatch({
      type: "TOGGLE_DARK_THEME",
      payload: { value },
    });
    setTheme(value ? "business" : "corporate");
  }

  const uiAction: UiAction = {
    toggleDarkTheme: () => {
      toggleDarkTheme(!uiState.darkTheme);
    },
    selectMenu: (menuId: string) => {
      // alert(menuId);
      dispatch({
        type: "SELECT_MENU",
        payload: { menuId },
      });
      // HIDE DRAWER
      dispatch({
        type: "TOGGLE_DRAWER",
        payload: { value: false },
      });
    },
    toggleDrawer: () => {
      dispatch({
        type: "TOGGLE_DRAWER",
        payload: { value: !uiState.menu.isDrawerOpen },
      });
    },
    toggleCommandPalette: () => {
      dispatch({
        type: "TOGGLE_COMMAND_PALETTE",
        payload: { value: !uiState.command.isPaletteOpen },
      });
    },
    runCommand: (commandId) => {
      dispatch({
        type: "RUN_COMMAND",
        payload: { commandId },
      });
    },
  };

  const value: UiContextProps = {
    state: uiState,
    action: uiAction,
  };

  // keydown listeners
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (router.pathname === "/" || router.pathname === "/404") {
        if (uiState.command.isPaletteOpen) {
          uiAction.toggleCommandPalette();
        }
        return;
      }
      const key: string = event.key.toLowerCase();
      // OPEN COMMAND PALETTE
      if (event.ctrlKey && key === "/") {
        if (uiState.menu.isDrawerOpen) {
          uiAction.toggleDrawer();
        }
        // Close all modal & drawer
        const activeModalOverlayList: HTMLElement[] = Array.from(
          document.getElementsByClassName(ID_DIALOG_OVERLAY),
        ) as HTMLElement[];
        activeModalOverlayList.forEach((element) => {
          element.click();
        });
        uiAction.toggleCommandPalette();
      }
      // OPEN DRAWER
      else if (event.ctrlKey && key === "m") {
        uiAction.toggleDrawer();
      }
    };
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, [
    router.pathname,
    // watch uiState change to monitor drawer, etc
    uiState,
  ]);

  return (
    <UiContext.Provider value={value}>
      <>{children}</>
    </UiContext.Provider>
  );
};
