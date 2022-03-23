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
      case "warning":
        iconComponent = <TiWarningOutline />;
      case "error":
        iconComponent = <RiCloseCircleLine />;
      default:
        break;
    }
  }
  const isMultiLined = subtitle !== "";
  return (
    <>
      <div className={`alert alert-${color} alert-info rounded-xl items-stretch`}>
        <div className="!flex !flex-grow !justify-between">
          <span
            className={`sm:text-3xl text-2xl
            ${
              isMultiLined
                ? "self-start"
                : "sm:self-center self-start"
            }`}
          >
            {icon || iconComponent}
          </span>

          <div className="flex sm:flex-row flex-col gap-4 sm:items-center item-start flex-grow">
            {/* Text section */}
            <div className="flex flex-col flex-grow gap-2 items-start">
              {subtitle !== "" ? (
                <h3 className="font-bold sm:text-lg text-base">{title}</h3>
              ) : (
                <h3 className="font-semibold sm:text-lg text-base">{title}</h3>
              )}
              {subtitle !== "" && (
                <p className="sm:text-base text-sm">{subtitle}</p>
              )}
            </div>
            {/* Button section */}
            <div className="flex-none my-auto">
              {action && (
                <button
                  className="btn min-w-24 float-right"
                  onClick={() => action()}
                >
                  <span className="first-letter:uppercase ">
                    {actionLabel}
                  </span>
                </button>
              )}
            </div>
            {/* workaround to fix a bug when sometimes colors are not loaded */}
            <div className="alert-info alert-success alert-warning alert-error hidden"></div>
          </div>
        </div>
      </div>
    </>
  );
}
