import Link from "next/link";
import React from "react";
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
  const activeClass = isActive
    ? // active
      "btn-primary text-white font-semibold"
    : // not active
      "bg-base-300 hover:bg-transparent hover:border-current";
  return (
    <li>
      <Link href={type === "MODAL" ? "" : `/${id}`} replace>
        <a
          className={`btn justify-start text-sm normal-case h-auto border-transparent ${activeClass}`}
          onClick={action}
        >
          {icon}
          {title}
        </a>
      </Link>
    </li>
  );
}
