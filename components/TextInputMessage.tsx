import React from "react";
import { MainColorTypes } from "../utils/models/GeneralModel";
interface TextInputMessageProps {
  color?: MainColorTypes;
  label: string;
}
export default function TextInputMessage({
  color = "current",
  label,
}: TextInputMessageProps) {
  return (
    <label className="label justify-start pb-0">
      {/* <span className="label-text">Alt label</span> */}
      <span
        className={`label-text text-${color} animated animated-headShake animated-faster`}
      >
        {label}
      </span>
    </label>
  );
}
