import { Transition } from "@headlessui/react";
import React, { InputHTMLAttributes, ReactNode, useState } from "react";
import { BsCheck } from "react-icons/bs";
import TextInputMessage from "./TextInputMessage";
import { MainColorTypes } from "../utils/models/GeneralModel";
interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  //   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: null | ReactNode;
  rules: () => string;
}
export default function TextInput({
  label = "",
  icon = null,
  //   onChange = () => {},
  rules = () => "",
  ...props
}: TextInputProps) {
  const [hasBeenFocused, setFocused] = useState(false);
  const isError = rules() !== "";
  const isSuccess = !isError;
  const isErrorAndFocused = isError && hasBeenFocused;
  let color: MainColorTypes = "primary";
  if (isErrorAndFocused) {
    color = "error";
  }
  if (isSuccess) {
    color = "success";
  }

  // set focused state to true after input text has been clicked
  function handleFocus() {
    setFocused(true);
  }

  const VALID_MARK = isError ? null : (
    <BsCheck
      className="absolute inset-y-0 right-0 my-auto mx-1 text-success pointer-events-none
      animated-faster animated animated-heartBeat"
      size={30}
    />
  );

  return (
    <div
      className={`form-control w-full ${
        isErrorAndFocused ? "text-input-error" : ""
      } z-0`}
    >
      {/* {"rules() : " + rules() + "<br>"}

      {"isSuccess : " + isSuccess + "<br>"}
      {"isError : " + isError + "<br>"}
      {"isErrorAndFocused : " + isErrorAndFocused + "<br>"} */}
      <div
        className="hidden text-error-content text-primary-content text-success 
      badge-error badge-primary badge-success"
      ></div>
      {label == "" ? (
        ""
      ) : (
        <label className="label input-primary input-error">
          <span className="label-text">{label}</span>
          {/* <div>{focused && "focused"}</div> */}
        </label>
      )}
      <label className="input-group relative">
        {!icon ? null : (
          <span
            className={`
            ${hasBeenFocused || isSuccess ? "bg-opacity-90" : "bg-opacity-30"}
            ${
              isErrorAndFocused
                ? "badge-error"
                : isSuccess
                ? "badge-success"
                : "bg-primary"
            } font-medium sm:text-3xl text-2xl transition-colors `}
          >
            {icon}
          </span>
        )}
        {/* Put in the middle so input-group css rounded children not distrubted */}
        {VALID_MARK}
        <input
          className={`input input-bordered w-full 
          ${props.type === "number" ? "pr-6" : "pr-9"}
          focus:${isErrorAndFocused ? `input-error` : "input-success"}
          ${isErrorAndFocused ? `input-error` : ""}
          ${isSuccess ? `input-success` : ""}
          `}
          //   set focused state to true after input text has been clicked
          onBlur={handleFocus}
          onFocus={handleFocus}
          autoFocus={false || props.autoFocus}
          {...props}
        />
      </label>
      <Transition
        show={isErrorAndFocused}
        enter="transform transition duration-200"
        enterFrom="scale-y-0"
        enterTo=" scale-y-100"
        leave="transform transition duration-200"
        leaveFrom="scale-y-100"
        leaveTo=" scale-y-0"
      >
        <TextInputMessage color={color} label={rules()} />
      </Transition>
      {/* {isError && <Alert color={color} label="Cannot be empty" />} */}
    </div>
  );
}
