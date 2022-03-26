import React, { ChangeEvent, useEffect, useState } from "react";
import { MdOutlineDarkMode, MdMenu } from "react-icons/md";
import { FiSun } from "react-icons/fi";
// import { RiAppsFill } from "react-icons/ri";
// import { useCountContext } from "../../utils/contexts/counter/CounterHooks";
import { useUiContext } from "../../utils/contexts/ui/UiHooks";
import {
  APP_NAME,
  LOGOUT_MODAL_DESC,
  LOGOUT_MODAL_TITLE,
} from "../../utils/helpers/constants/ConstantText";
import MenuItem from "./DrawerMenuItem";
import { MainChildren } from "../../utils/models/GeneralModel";
import { NextRouter, useRouter } from "next/router";
import {
  ID_MAIN_DRAWER,
  // ID_MODAL_LOGOUT,
} from "../../utils/helpers/constants/ConstantIds";
// import Modal from "../Modal";
import HeadlessModal from "../HeadlessModal";
import CommandPaletteForm from "../Forms/CommandPaletteForm";
type ModalValue = boolean;

export default function Drawer({ children }: MainChildren) {
  //   const { state: countState, action: countAction } = useCountContext();
  const { state: uiState, action: uiAction } = useUiContext();
  const router: NextRouter = useRouter();

  const [modalLogout, setModalLogout] = useState<ModalValue>(false);

  useEffect(() => {
    const page = router.pathname.split("/")[1];
    uiAction.selectMenu(page);
  }, [router.pathname]);

  useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
      // Anything in here is fired on component unmount.
    };
  }, []);

  // const xd: boolean = false;
  // const {theme, setTheme} = useTheme();

  function toggleModalLogout(value: boolean) {
    setModalLogout(value);
    // console.log(modalLogout);
  }
  return (
    <main className="drawer-mobile drawer min-h-screen w-full">
      <input
        id={ID_MAIN_DRAWER}
        type="checkbox"
        className="btn drawer-toggle"
        checked={uiState.menu.isDrawerOpen}
        onChange={(event) => {
          uiAction.toggleDrawer();
        }}
      />
      <div className="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div className="navbar sticky w-full bg-base-300">
          {/* toggle menu button */}
          <label
            className="btn btn-ghost btn-circle mr-2 lg:hidden"
            htmlFor={ID_MAIN_DRAWER}
          >
            <MdMenu size={30} className="text-base-content" />
          </label>
          {/* app name */}
          <img src="/icon.png" alt="icon" height={30} width={30} />
          <div className="mx-2 flex-1 text-lg font-bold">{APP_NAME}</div>
          {/* toggle darktheme */}
          <div className="flex items-center">
            <label className="swap btn btn-ghost swap-rotate btn-circle">
              <input
                type="checkbox"
                checked={uiState.darkTheme}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  uiAction.toggleDarkTheme()
                }
              />
              {/* if darktheme on show the light theme icon */}
              <MdOutlineDarkMode
                size={30}
                className="swap-off text-base-content"
              />
              <FiSun size={30} className="swap-on text-base-content" />
            </label>
          </div>
        </div>
        {/* CONTENT */}
        {children}
      </div>
      {/* Drawer side */}
      <div className="drawer-side">
        <label
          htmlFor={ID_MAIN_DRAWER}
          className="drawer-overlay !cursor-default backdrop-blur-sm"
        />
        {/* <!-- Sidebar content here --> */}
        <ul className="menu w-60 overflow-y-auto bg-base-300 p-4 text-base-content">
          {uiState.menu.list.map((menu, index) => (
            <MenuItem
              key={index}
              menu={menu}
              isActive={menu.id === uiState.menu.active}
              action={() =>
                menu.type == "PAGE"
                  ? uiAction.selectMenu(menu.id)
                  : toggleModalLogout(true)
              }
            />
          ))}
        </ul>
      </div>
      {/* Logout modal */}
      <>
        {/* <input
          id={ID_MODAL_LOGOUT}
          type="checkbox"
          checked={modalLogout}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            toggleModalLogout(event.target.checked)
          }
          className="modal-toggle"
        /> */}
        <HeadlessModal
          // id={"SLSLSL"}
          title={LOGOUT_MODAL_TITLE}
          color="primary"
          desc={LOGOUT_MODAL_DESC}
          value={modalLogout}
          labelY="Log out"
          onClose={(value) => toggleModalLogout(value)}
          actionY={() => {
            router.replace("/");
            // alert(router.pathname);
          }}
        />
        {/* COMMAND PALETTE MODAL */}
        <HeadlessModal
          isRaw={true}
          value={uiState.command.isPaletteOpen}
          onClose={(value) => uiAction.toggleCommandPalette()}
        >
          <CommandPaletteForm
            onClose={(value) => uiAction.toggleCommandPalette()}
          />
        </HeadlessModal>
      </>
    </main>
  );
}
