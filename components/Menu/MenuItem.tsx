import React, { ReactNode } from "react";

type MenuItemProps = {
//   key: string;
  title: string;
  icon: ReactNode;
  isActive: boolean;
  action: () => void;
};

export default function MenuItem({
//   key,
  title,
  icon,
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
      <a
        className={`btn justify-start text-sm normal-case text-base h-auto border-transparent ${activeClass}`}
        onClick={action}
      >
        {icon}
        {title}
      </a>
    </li>
  );
}
