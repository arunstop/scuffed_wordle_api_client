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
      <div className={`alert alert-${color} alert-info rounded-xl pb-5`}>
        <div className="flex-grow">
          <span
            className={`${
              isMultiLined
                ? "sm:text-4xl text-3xl self-start"
                : "sm:text-3xl text-2xl"
            }`}
          >
            {icon || iconComponent}
          </span>

          <div className="flex sm:flex-row flex-col gap-4 items-start flex-grow">
            {/* Text section */}
            <div className="flex flex-col flex-grow gap-1">
              {subtitle !== "" ? (
                <h3 className="font-bold sm:text-lg text-base">{title}</h3>
              ) : (
                <h3 className="">{title}</h3>
              )}
              {subtitle !== "" && (
                <p className="sm:text-sm text-xs">{subtitle}</p>
              )}
            </div>
            {/* Button section */}
            <div className="flex-none my-auto">
              {action && (
                <button
                  className="btn btn-sm sm:btn-md min-w-24"
                  onClick={() => action()}
                >
                  <span className="first-letter:uppercase sm:text-base text-sm">
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
