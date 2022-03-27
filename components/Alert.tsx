import React, { ReactNode } from "react";
import { BiCircle } from "react-icons/bi";
import { GoInfo } from "react-icons/go";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiWarningOutline } from "react-icons/ti";
import { BsCheckCircle } from "react-icons/bs";
import { MainColorTypes } from "../utils/models/GeneralModel";
interface AlertProps {
  color?: MainColorTypes | "";
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  action?: () => void;
  actionLabel?: string;
}
export default function Alert({
  color = "",
  icon = null,
  title,
  subtitle = "",
  action,
  actionLabel = "",
}: AlertProps) {
  let iconComponent: ReactNode = <BiCircle />;
  if (icon === null) {
    switch (color) {
      case "info":
        iconComponent = <GoInfo />;
        break;
      case "success":
        iconComponent = <BsCheckCircle />;
        break;
      case "warning":
        iconComponent = <TiWarningOutline />;
        break;
      case "error":
        iconComponent = <RiCloseCircleLine />;
        break;
      default:
        break;
    }
  }
  const isMultiLined = subtitle !== "";

  const ICON = (
    <span
      className={`sm:text-3xl text-2xl
            ${isMultiLined ? "self-start" : "sm:self-center self-start"}`}
    >
      {icon || iconComponent}
    </span>
  );
  const MESSAGE_BUTTON = (
    <div className="my-auto flex-none ">
      {action && (
        <button className="min-w-24 btn" onClick={() => action()}>
          <span className="first-letter:uppercase ">{actionLabel}</span>
        </button>
      )}
    </div>
  );
  const MESSAGE_TEXT = (
    <div className="flex grow flex-col items-start gap-2">
      {subtitle !== "" ? (
        <h3 className="text-base font-bold sm:text-lg">{title}</h3>
      ) : (
        <h3 className="text-base font-semibold sm:text-lg">{title}</h3>
      )}
      {subtitle !== "" && <p className="text-sm sm:text-base">{subtitle}</p>}
    </div>
  );
  const MESSAGE = (
    <div className="item-start flex grow flex-col gap-4 sm:flex-row sm:items-center">
      {MESSAGE_TEXT}
      {MESSAGE_BUTTON}
      {/* workaround to fix a bug when sometimes colors are not loaded */}
      <div className="alert-info alert-success alert-warning alert-error hidden"></div>
    </div>
  );
  return (
    <>
      <div
        className={`alert alert-${color} alert-info rounded-xl items-stretch`}
      >
        <div className="!flex !grow !justify-between">
          {ICON}
          {MESSAGE}
        </div>
      </div>
    </>
  );
}
