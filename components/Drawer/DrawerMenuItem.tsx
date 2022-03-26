import Link from "next/link";
import React from "react";
import { ID_MODAL_LOGOUT } from "../../utils/helpers/constants/ConstantIds";
import { UiMenu } from "../../utils/models/UiModel";

type MenuItemProps = {
  menu: UiMenu;
  isActive: boolean;
  action: () => void;
};

export default function MenuItem({
  menu: { id, icon, title, type },
  isActive,
  action,
}: MenuItemProps) {
  const isModal = type === "MODAL";
  const activeClass = isActive
    ? // active
      "btn-primary text-white font-semibold"
    : // not active
      "bg-base-300 hover:bg-transparent hover:border-current";
  const item = (
    <a
      id={isModal ? ID_MODAL_LOGOUT : ""}
      className={`btn justify-start text-sm normal-case h-auto border-transparent ${activeClass}`}
      onClick={action}
    >
      <span className="text-2xl">{icon}</span>
      {title}
    </a>
  );
  return (
    <li>
      {isModal ? (
        item
      ) : (
        <Link href={`/${id}`} replace>
          {item}
        </Link>
      )}
    </li>
  );
}
