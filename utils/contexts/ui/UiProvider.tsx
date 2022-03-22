import { useTheme } from "next-themes";
import { useReducer } from "react";
import { MainChildren as ContextChildren } from "../../models/GeneralModel";
import { slugify } from "../../models/GlobalModel";
import {
  UiAction,
  UiActionTypes,
  UiContextProps,
  UiMenu,
  UiState,
} from "../../models/UiModel";
import { UiContext } from "./UiContext";
import {MdOutlineSpaceDashboard,MdOutlineErrorOutline} from "react-icons/md";
import {GoBook} from "react-icons/go";
import {HiOutlineLogout} from "react-icons/hi";
import {RiApps2Line} from "react-icons/ri";
import { BsChatQuote } from "react-icons/bs";


const getInitialMenuList = (): UiMenu[] => {
  const menuList = [
    { title: "Dashboard", type: "PAGE",icon:<MdOutlineSpaceDashboard size={24} /> },
    { title: "Dictionary", type: "PAGE",icon:<GoBook size={24}/> },
    { title: "Games", type: "PAGE",icon:<RiApps2Line size={24} /> },
    { title: "Issue Reports", type: "PAGE",icon:<MdOutlineErrorOutline size={24} /> },
    { title: "Phrases", type: "PAGE",icon:<BsChatQuote size={24} /> },
    { title: "Logout", type: "MODAL",icon:<HiOutlineLogout size={24} className="rotate-180" /> },
  ];

  // Giving each child on the menuList an id
  const menuWithIdList = (): UiMenu[] => {
    return menuList.map(
      (menu) =>
        ({
          id: slugify(menu.title),
          title: menu.title,
          type: menu.type,
          icon:menu.icon,
        } as UiMenu), // Cast the anonymous object into UiMenu
    );
  };

  return menuWithIdList();
};

const INITIAL_STATE: UiState = {
  darkTheme: false,
  menuList: getInitialMenuList(),
  // menuOn: getInitialMenuList()[0].id,
  menuOn: "",
};

const reducer = (state: UiState, action: UiActionTypes) => {
  // const { darkTheme } = state;
  const { type, payload } = action;
  switch (type) {
    case "TOGGLE_DARK_THEME":
      return { ...state, darkTheme: payload };
    case "SELECT_MENU":
      return { ...state, menuOn: payload };
    default:
      return state;
  }
};

export const UiProvider = ({ children }: ContextChildren) => {
  // HYDRATION ERROR
  const { theme, setTheme } = useTheme(); 

  const [uiState, dispatch] = useReducer(reducer, {
    ...INITIAL_STATE,
    darkTheme: theme === "business",
  });
  const uiAction: UiAction = {
    toggleDarkTheme: (darkTheme: boolean) => {
      setTheme(darkTheme ? "business" : "corporate");
      dispatch({
        type: "TOGGLE_DARK_THEME",
        payload: darkTheme,
      });
    },
    selectMenu: (menuId: string) => {
      // alert(menuId);
      dispatch({
        type: "SELECT_MENU",
        payload: menuId,
      });
    },
  };
  const value: UiContextProps = {
    state: uiState,
    action: uiAction,
  };
  return (
    <UiContext.Provider value={value}>
      <>{children}</>
    </UiContext.Provider>
  );
};
