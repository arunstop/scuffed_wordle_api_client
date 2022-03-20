import React from "react";
import { MainColorTypes } from "../utils/models/GeneralModel";
interface AlertProps {
  color?: MainColorTypes;
  label: string;
}
export default function Alert({ color="current", label }: AlertProps) {
  return (
    <label className="label justify-start pb-0">
        {/* <span className="label-text">Alt label</span> */}
      <span className={`label-text text-${color}`}>{label}</span>
    </label>
  );
}
