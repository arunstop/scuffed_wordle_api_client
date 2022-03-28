import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, PropsWithChildren, ReactNode, useRef } from "react";
import { GoInfo } from "react-icons/go";
import { ID_DIALOG_OVERLAY } from "../utils/helpers/constants/ConstantIds";
import { MainColorTypes } from "../utils/models/GeneralModel";
import ModalBackButton from "./ModalBackButton";

type ModalProps = {
  title?: string;
  desc?: string;
  color?: MainColorTypes;
  value: boolean;
  labelY?: string;
  // onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  actionY?: () => void;
  actionN?: () => void;
  onClose: (value: boolean) => void;
  noAction?: boolean;
  isBig?: boolean;
  isRaw?: boolean;
};

type ModalRawProps = {
  isRaw: boolean;
  rawChildren: ReactNode;
};

type ModalTypes =
  | PropsWithChildren<ModalProps>
  | PropsWithChildren<ModalRawProps>;

export default function HeadlessModal({
  title,
  desc,
  color = "primary",
  value,
  labelY = "OK",
  // onChange = () => {},
  actionY = () => null,
  actionN = () => null,
  onClose = () => null,
  children,
  noAction = false,
  isBig = false,
  isRaw = false,
}: PropsWithChildren<ModalProps>) {
  const completeButtonRef = useRef(null);
  //   function closeModal() {}

  const OVERLAY = (
    <>
      <Transition.Child
        as={Fragment}
        enter="transform transition duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transform duration-300 transition ease-in-out"
        leaveFrom="opacity-100 "
        leaveTo="opacity-0 "
      >
        <Dialog.Overlay
          className={`hero-overlay fixed inset-0 ${ID_DIALOG_OVERLAY}`}
          onClick={() => alert("click")}
        />
      </Transition.Child>
      <div
        className="hidden text-error text-primary text-info shadow-error/20 shadow-primary/20 shadow-info/20
      from-error/30 from-primary/30 from-info/30 via-error/10 via-primary/10 via-info/10
      border-error/40 border-primary/40 border-info/40
      btn-error btn-primary btn-info
      "
      ></div>
    </>
  );

  {
    /* Workaround to dodge initial focus */
  }
  const INITIAL_FOCUS_TRICK_BUTTON = !isBig ? null : <button className="h-0" />;

  const GRADIENT_BG = (
    <div
      className={`absolute inset-0 h-40 -z-[1]
      bg-gradient-to-b from-${color}/30 via-${color}/10 to-transparent`}
    ></div>
  );

  const ICON = isBig ? null : (
    <div
      className={`shadow-lg bg-${color} bg-opacity-30 text-${color}
    rounded-full border-${color} sm:self-start self-center p-2 flex-shrink
    
    `}
    >
      <GoInfo size={36} />
    </div>
  );

  const TITLE = (
    <Dialog.Title
      as="div"
      className={`text-2xl font-bold text-center ${
        isBig
          ? `flex items-center justify-between text-right`
          : `sm:text-left text-${color}`
      }
      `}
    >
      {/* BACK BUTTON */}
      {isBig && <ModalBackButton action={() => onClose(false)} />}
      <span className="self-center">{title}</span>
    </Dialog.Title>
  );

  // Description
  const DESC = children ? (
    children
  ) : (
    <>
      {/* Desc */}
      <p className="text-center sm:text-left">{desc}</p>
    </>
  );

  // Action buttons
  const ACTION_BUTTONS =
    !!noAction || isBig ? null : (
      <>
        {/* BUTTON */}
        <div className="modal-action flex-wrap gap-4 sm:flex-row-reverse sm:justify-start">
          <button
            className={`btn btn-${color} m-0 btn-block sm:w-40 font-bold truncate capitalize`}
            onClick={() => {
              actionY();
              onClose(false);
            }}
            tabIndex={1}
          >
            {labelY}
          </button>
          <button
            className="btn-outline btn btn-block m-0 sm:w-fit"
            onClick={() => {
              actionN();
              onClose(false);
            }}
          >
            Cancel
          </button>
        </div>
      </>
    );
  // Raw content meaning no title, desc and buttons
  const CONTENT_RAW = children;

  // Not raw children =  including title, desc and buttons
  const CONTENT_NOT_RAW = (
    <div
      className={`modal-box pointer-events-auto z-10 !scale-100 [--tw-translate-y:0] 
        flex flex-col overflow-hidden shadow-2xl sm:border-transparent  
        shadow-${color}/20 p-2
    ${
      isBig
        ? "rounded-none sm:rounded-xl h-full sm:h-auto max-h-full sm:max-h-[calc(100vh_-_5em)]"
        : `rounded-xl`
    }`}
    >
      {/* <div className={` ${
        isBig 
        ? "sm:border-8 border-0 border-base-100"
        : `outline-t-8 outline-${color}`
      }`}> */}
      <div
        className={`flex p-4 ${
          isBig ? `` : `sm:flex-row`
        } flex-col gap-4 overflow-auto`}
      >
        {ICON}
        <div className="flex w-full flex-col gap-4">
          {TITLE}
          {DESC}
          {ACTION_BUTTONS}
        </div>
      </div>
      {GRADIENT_BG}
      {/* </div> */}
    </div>
  );

  const CONTENT = isRaw ? CONTENT_RAW : CONTENT_NOT_RAW;

  return (
    <Transition appear show={value} as={Fragment}>
      <Dialog
        open={value}
        as="div"
        initialFocus={completeButtonRef}
        className="modal pointer-events-auto visible transform-none overflow-hidden bg-transparent opacity-100 transition-none"
        onClose={onClose}
      >
        {OVERLAY}
        {INITIAL_FOCUS_TRICK_BUTTON}
        {/* CONTENT */}
        <Transition.Child
          as={"div"}
          className={`animated transition-all transform w-full h-full overflow-auto 
          pointer-events-none flex items-end sm:items-center justify-center`}
          // enter="sm:animated-rotateIn animated-fadeInUp duration-1000"
          enter="duration-[300ms] "
          // if isBig show scaling animation
          // if it's not show slide up animation
          enterFrom={`${
            isBig
              ? "scale-y-0 sm:scale-[1.5] origin-bottom sm:origin-center"
              : "scale-y-0 sm:scale-[1.5] origin-bottom sm:origin-center"
          }  opacity-0`}
          enterTo={`${
            isBig
              ? "scale-90"
              : "scale-90 sm:scale-90 origin-bottom sm:origin-center"
          }  opacity-100`}
          // leave="duration-[300ms] sm:animated-zoomOut"
          leave="duration-[300ms]"
          // origin-top to pull down scaled-y element
          leaveFrom={`opacity-100  scale-100 sm:scale-100 ${
            isBig ? "translate-y-0" : ""
          } origin-top sm:origin-center`}
          leaveTo={`opacity-0 scale-y-[1.5] scale-x-[0.25] sm:scale-0 ${
            isBig ? "translate-y-60" : ""
          } origin-top sm:origin-center`}
        >
          {CONTENT}
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
