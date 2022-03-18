import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
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
  onClose?: (value: boolean) => void;
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
}: ModalProps) {
  //   function closeModal() {}
  return (
    <Transition appear show={value} as={Fragment}>
      <Dialog
        as="div"
        className="modal bg-transparent opacity-100 visible z-20 pointer-events-auto "
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
        <Transition.Child
          as={"div"}
          className={`modal-box border-t-8 border-${color} gap-4 
          sm:border-transparent flex sm:flex-row flex-col transform-none z-10 relative 
          animatecss duration-300
          `}
          enter="sm:animatecss-jackInTheBox animatecss-fadeInUp duration-300"
          // enterFrom="opacity-0 scale-95"
          // enterTo="opacity-100 scale-100"
          leave="sm:animatecss-zoomOut animatecss-fadeOutDownBig duration-300"
          //   leaveFrom="opacity-100 scale-100"
          //   leaveTo="opacity-0 scale-50"
        >
          <div
            className={`mask mask-circle bg-${color} bg-opacity-30 text-${color} rounded-full border-${color} self-center sm:self-start p-2`}
          >
            <GoInfo size={36} />
          </div>

          <div className="flex flex-col gap-4">
            {/* Title */}
            <Dialog.Title
              as="p"
              className={`text-2xl font-bold text-${color} text-center sm:text-left`}
            >
              {title}
            </Dialog.Title>
            {/* Desc */}
            <p className="text-center sm:text-left">{desc}</p>
            {/* BUTTON */}
            <div className="modal-action mt-4 flex-wrap sm:flex-row-reverse sm:justify-start gap-4">
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
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}

export default HeadlessModal;
