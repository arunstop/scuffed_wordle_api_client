import { Transition } from "@headlessui/react";
import React, { InputHTMLAttributes, ReactNode, useState } from "react";
import Alert from "./Alert";
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
  const [focused, setFocused] = useState(false);
  const isError = rules() !== "" && focused;
  const color = isError ? "error" : "primary";

  //   set focused state to true after input text has been clicked
  function handleFocus() {
    setFocused(true);
  }

  return (
    <div className="form-control w-full">
      {label !== "" ? (
        ""
      ) : (
        <label className="label input-primary input-error">
          <span className="label-text">{label}</span>
          {/* <div>{focused && "focused"}</div> */}
        </label>
      )}
      <label className="input-group">
        <span className={`bg-${color} bg-opacity-30 font-black text-3xl`}>{icon}</span>
        <input
          className={`input input-bordered w-full
          focus:${isError ? `input-error` : "input-primary"}
          ${isError ? `input-error` : ""}
          `}
          //   set focused state to true after input text has been clicked
          onBlur={handleFocus}
          onFocus={handleFocus}
          autoFocus={false || props.autoFocus}
          {...props}
        />
      </label>
      <Transition
        show={isError}
        enter="transform transition duration-200"
        enterFrom="scale-y-0"
        enterTo=" scale-y-100"
        leave="transform transition duration-200"
        leaveFrom="scale-y-100"
        leaveTo=" scale-y-0"
      >
        <Alert color={color} label={rules()} />
      </Transition>
      {/* {isError && <Alert color={color} label="Cannot be empty" />} */}
    </div>
  );
}
