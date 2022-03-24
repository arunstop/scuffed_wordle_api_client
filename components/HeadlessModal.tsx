import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, PropsWithChildren, useRef } from "react";
import { GoInfo } from "react-icons/go";
import { FaArrowLeft } from "react-icons/fa";

import { MainColorTypes } from "../utils/models/GeneralModel";

type ModalProps = {
  title: string;
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
};

function HeadlessModal({
  title,
  desc,
  color = "info",
  value,
  labelY = "OK",
  // onChange = () => {},
  actionY = () => null,
  actionN = () => null,
  onClose = () => null,
  children,
  noAction = false,
  isBig = false,
}: PropsWithChildren<ModalProps>) {
  const completeButtonRef = useRef(null);
  //   function closeModal() {}
  return (
    <Transition appear show={value} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={completeButtonRef}
        className="modal pointer-events-auto visible z-20 overflow-hidden bg-transparent opacity-100"
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="transform transition duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-300 transition ease-in-out"
          leaveFrom="opacity-100 "
          leaveTo="opacity-0 "
        >
          <Dialog.Overlay className="hero-overlay fixed inset-0" />
        </Transition.Child>
        <div className="hidden ring-info ring-success ring-warning ring-error"></div>

        {/* This element is to trick the browser into centering the modal contents. */}
        {/* <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span> */}
        {!isBig ? "" : <button className="h-0" />}

        <Transition.Child
          as={"div"}
          className={`modal-box gap-4 transform-none z-10 overflow-auto
          ${
            isBig
              ? "sm:border-8 border-0 border-base-100 h-full sm:h-auto max-h-full sm:max-h-[calc(100vh_-_5em)]"
              : `border-t-8 border-${color}`
          }
          flex flex-col sm:border-transparent shadow-${color}/30 shadow-2xl
          animated
          `}
          enter="sm:animated-jackInTheBox animated-fadeInUp"
          // enterFrom="opacity-0 scale-95"
          // enterTo="opacity-100 scale-100"
          leave="sm:animated-zoomOut animated-fadeOutDownBig"
          //   leaveFrom="opacity-100 scale-100"
          //   leaveTo="opacity-0 scale-50"
        >
          <div className={`flex ${isBig ? `` : `sm:flex-row`} flex-col gap-4`}>
            {!isBig && (
              <div
                className={`mask mask-circle bg-${color} bg-opacity-30 text-${color} rounded-full border-${color} 
              sm:self-start self-center p-2 flex-shrink`}
              >
                <GoInfo size={36} />
              </div>
            )}

            <div className="flex w-full flex-col gap-4">
              {/* Title */}
              {/* Workaround to DISABLE INITIAL FOCUS
              by using as="button" */}
              <Dialog.Title
                as="div"
                className={` text-2xl font-bold text-center  ${
                  isBig
                    ? `flex items-center justify-between text-right`
                    : `sm:text-left text-${color}`
                }`}
              >
                {/* BACK BUTTON */}
                {isBig && (
                  <label
                    // [background-color:hsl(var(--bc)_/_0.3)]
                    className="btn-outline btn btn-secondary btn-circle flex items-center justify-center border-0 bg-primary/30 !text-3xl leading-none ![color:hsl(var(--bc))]"
                    onClick={() => onClose(false)}
                  >
                    <FaArrowLeft />
                  </label>
                )}
                <span className="self-center">{title}</span>
              </Dialog.Title>
              {children ? (
                children
              ) : (
                <>
                  {/* Desc */}
                  <p className="text-center sm:text-left">{desc}</p>
                </>
              )}

              {!!noAction || isBig ? null : (
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
              )}
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default HeadlessModal;
