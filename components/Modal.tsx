import React, { ChangeEvent } from "react";
import { MainColorTypes } from "../utils/models/GeneralModel";

type ModalProps = {
  id: string;
  title: string;
  desc: string;
  color?: MainColorTypes;
  value?: boolean;
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
  onChange = () => {},
  actionY = () => {},
  actionN = () => {},
}: ModalProps) {
  // console.log(value);
  return (
    <>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="modal-toggle"
      />
      <div className="modal backdrop-blur-sm z-20">
        <div
          className={`modal-box border-2 border-${color} sm:border-transparent`}
        >
          <p className={`text-2xl mb-6 font-bold text-${color}`}>{title}</p>
          <p>{desc}</p>
          <div className="modal-action">
            <label
              htmlFor={id}
              className="btn w-24 btn-outline"
              onClick={() => actionN()}
            >
              Cancel
            </label>
            <label
              htmlFor={id}
              className={`btn w-24 btn-${color}`}
              onClick={() => actionY()}
            >
              OK
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
