import React, { ChangeEvent } from "react";
import { GoInfo } from "react-icons/go";
import { BsCheck2Circle } from "react-icons/bs";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MainColorTypes } from "../utils/models/GeneralModel";

type ModalProps = {
  id: string;
  title: string;
  desc: string;
  color?: MainColorTypes;
  value?: boolean;
  labelY?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  actionY?: () => void;
  actionN?: () => void;
};
export default function Modal({
  id,
  title,
  desc,
  color = "info",
  value,
  labelY = "OK",
  onChange = () => {},
  actionY = () => {},
  actionN = () => {},
}: ModalProps) {
  // console.log(value);
  function renderButton() {
    const size: number = 36;
    switch (color) {
      case "success":
        return <BsCheck2Circle size={size} />;
      case "warning":
        return <GoInfo size={size} />;
      case "error":
        return <IoMdCloseCircleOutline size={size} />;
      default:
        return <GoInfo size={size} />;
    }
  }
  return (
    <>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="modal-toggle"
      />
      <label htmlFor={id} className="modal  backdrop-blur-sm z-20">
        <label
          htmlFor=""
          className={`modal-box border-t-8 border-${color} gap-4 sm:border-transparent flex md:flex-row flex-col `}
        >
          <div
            className={`mask mask-circle bg-${color} bg-opacity-30 text-${color} rounded-full border-${color} self-center md:self-start p-2`}
          >
            {renderButton()}
          </div>
          <div className="flex flex-col gap-4">
            <p
              className={`text-2xl font-bold text-${color} text-center md:text-left`}
            >
              {title}
            </p>
            <p className="text-center md:text-left">{desc}</p>
            <div className="modal-action mt-4 flex-wrap md:flex-row-reverse md:justify-start gap-4">
              <label
                htmlFor={id}
                className={`btn btn-${color} m-0 btn-block md:w-24 font-bold`}
                onClick={() => actionY()}
              >
                {labelY}
              </label>
              <label
                htmlFor={id}
                className="btn btn-outline m-0 btn-block md:w-24"
                onClick={() => actionN()}
              >
                Cancel
              </label>
            </div>
          </div>
        </label>
      </label>
    </>
  );
}
