import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, PropsWithChildren, useRef } from "react";
import { GoInfo } from "react-icons/go";
import { MainColorTypes } from "../utils/models/GeneralModel";

type ModalProps = {
  title: string;
  desc: string;
  color?: MainColorTypes;
  value: boolean;
  labelY?: string;
  // onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  actionY?: () => void;
  actionN?: () => void;
  onClose: (value: boolean) => void;
  noAction?: boolean;
  big?: boolean;
};

function HeadlessModal({
  title,
  desc,
  color = "info",
  value,
  labelY = "OK",
  // onChange = () => {},
  actionY = () => {},
  actionN = () => {},
  onClose = () => {},
  children,
  noAction = false,
  big = false,
}: PropsWithChildren<ModalProps>) {
  let completeButtonRef = useRef(null);
  //   function closeModal() {}
  return (
    <Transition appear show={value} as={Fragment}>
      <Dialog
        as="div"
        initialFocus={completeButtonRef}
        className="modal bg-transparent opacity-100 visible z-20 pointer-events-auto overflow-hidden"
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
          <Dialog.Overlay className="fixed inset-0 hero-overlay" />
        </Transition.Child>

        {/* This element is to trick the browser into centering the modal contents. */}
        {/* <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span> */}
        <button className="h-0"></button>

        <Transition.Child
          as={"div"}
          className={`modal-box border-t-8 border-${color} gap-4 transform-none z-10 overflow-auto
          flex flex-col sm:border-transparent
          animated
          `}
          enter="sm:animated-jackInTheBox animated-fadeInUp"
          // enterFrom="opacity-0 scale-95"
          // enterTo="opacity-100 scale-100"
          leave="sm:animated-zoomOut animated-fadeOutDownBig"
          //   leaveFrom="opacity-100 scale-100"
          //   leaveTo="opacity-0 scale-50"
        >
          <div className={`flex ${big ? `` : `sm:flex-row`} flex-col gap-4`}>
            {!big && (
              <div
                className={`mask mask-circle bg-${color} bg-opacity-30 text-${color} rounded-full border-${color} 
              sm:self-start self-center p-2 flex-shrink`}
              >
                <GoInfo size={36} />
              </div>
            )}

            <div className="flex flex-col gap-4 w-full">
              {/* Title */}
              {/* Workaround to DISABLE INITIAL FOCUS
              by using as="button" */}
              <Dialog.Title
                as="div"
                className={`text-2xl font-bold text-${color} text-center  ${
                  big ? `` : `sm:text-left`
                }`}
              >
                {title}
              </Dialog.Title>
              {!!children ? (
                children
              ) : (
                <>
                  {/* Desc */}
                  <p className="text-center sm:text-left">{desc}</p>
                </>
              )}

              {!!noAction || big ? null : (
                <>
                  {/* BUTTON */}
                  <div className="modal-action flex-wrap sm:flex-row-reverse sm:justify-start gap-4">
                    <label
                      className={`btn btn-${color} m-0 btn-block sm:w-40 font-bold truncate capitalize`}
                      onClick={() => {
                        actionY();
                        onClose(false);
                      }}
                    >
                      {labelY}
                    </label>
                    <label
                      className="btn btn-outline m-0 btn-block sm:w-fit"
                      onClick={() => {
                        actionN();
                        onClose(false);
                      }}
                    >
                      Cancel
                    </label>
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
