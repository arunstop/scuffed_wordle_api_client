import React from "react";

type MenuItemProps = {
//   key: string;
  title: string;
  isActive: boolean;
  action: () => void;
};

export default function MenuItem({
//   key,
  title,
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
        className={`btn justify-start normal-case text-base h-auto border-transparent ${activeClass}`}
        onClick={action}
      >
        {title}
      </a>
    </li>
  );
}
