import { Combobox, Transition } from "@headlessui/react";
import _ from "lodash";
import React, { Fragment, ReactNode, useState } from "react";
import { FaTerminal } from "react-icons/fa";
import { HiSelector } from "react-icons/hi";
// import { MdCheck } from "react-icons/md";
import { useUiContext } from "../../utils/contexts/ui/UiHooks";
import { UiCommand } from "../../utils/models/UiModel";
import ModalBackButton from "../ModalBackButton";
// import TextInput from "../TextInput";

export default function CommandPaletteForm({
  onClose = () => null,
}: {
  onClose: (value: boolean) => void;
}) {
  const { state: uiState, action: uiAction } = useUiContext();
  const [selected, setSelected] = useState<UiCommand | null>();
  const [query, setQuery] = useState("");
  const filteredList = !query
    ? uiState.command.list
    : _.filter(uiState.command.list, (command) =>
        command.title.toLowerCase().trim().includes(query.toLowerCase().trim()),
      );

  const GRADIENT_BG = (
    <div
      className={`absolute inset-0 h-40 -z-[1] bg-gradient-to-b 
      from-primary/40 via-primary/20 to-transparent sm:rounded-xl`}
    ></div>
  );

  const TITLE = (
    <div
      className={` text-2xl font-bold  flex items-center justify-between text-right`}
    >
      {/* BACK BUTTON */}
      <ModalBackButton action={() => onClose(false)} />
      <span className="self-center">Command Palette</span>
    </div>
  );
  const COMBOBOX_INPUT = (
    <label className="input-group">
      <span className="bg-primary/30 text-2xl sm:text-3xl">
        <FaTerminal />
      </span>
      <Combobox.Input
        as={Fragment}
        displayValue={(command: UiCommand) => command.title}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      >
        <input
          type="text"
          value={query}
          placeholder="Search commands..."
          className="input-bordered input input-md w-full !rounded-r-xl pr-8 focus:input-primary sm:input-lg"
          autoFocus
        />
      </Combobox.Input>
    </label>
  );
  const COMBOBOX_INPUT_BUTTON = (
    <Combobox.Button className="absolute  inset-y-0 right-0 flex items-center pr-2">
      <HiSelector className="h-5 w-5 text-gray-400" aria-hidden="true" />
    </Combobox.Button>
  );

  const COMBOBOX_AUTOCOMPLETE_INPUT = (
    <div>
      {COMBOBOX_INPUT}
      {COMBOBOX_INPUT_BUTTON}
    </div>
  );

  const COMBO_BOX_OPTIONS_NO_DATA = (
    <div className="relative cursor-default select-none py-2 px-4 text-center">
      Nothing command found.
    </div>
  );

  const COMBOBOX_OPTIONS_ITEM = (
    command: UiCommand,
    isSelected: boolean,
  ): ReactNode => (
    <Combobox.Option
      key={command.title}
      value={command}
      className={({
        active,
      }) => `cursor-default select-none relative py-2 pl-12 pr-4 
            ${active ? "text-white bg-primary/100" : ""}
            ${
              isSelected && !active
                ? "bg-primary-content text-primary-focus"
                : ""
            }
            `}
    >
      <>
        <span className="grid gap-2">
          {/* TITLE */}
          <h1
            className={`block truncate text-md sm:text-lg ${
              isSelected ? "font-bold" : "font-medium"
            }`}
          >
            {command.title}
          </h1>
          {/* DESCRIPTION */}
          {command.desc && (
            <p
              className={`text-xs sm:text-sm pb-2 ${
                isSelected ? "" : "text-inherit/30"
              }`}
            >
              {command.desc}
            </p>
          )}
        </span>
        {/* ICON */}
        <span
          className={`absolute ${
            command.desc ? "top-0 mt-2" : "inset-y-0"
          } left-0 flex items-center pl-3 text-2xl`}
        >
          {command.icon}
        </span>
      </>
    </Combobox.Option>
  );

  const COMBOBOX_OPTIONS = (
    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      afterLeave={() => setQuery("")}
    >
      <Combobox.Options
        className="absolute mt-2 max-h-60 w-full overflow-auto rounded-md rounded-t-sm 
        bg-base-100 text-base shadow-lg focus:outline-none"
      >
        {filteredList.length === 0 && query !== ""
          ? COMBO_BOX_OPTIONS_NO_DATA
          : filteredList.map((command) => {
              const isSelected: boolean = command.title === selected?.title;
              return COMBOBOX_OPTIONS_ITEM(command, isSelected);
            })}
      </Combobox.Options>
    </Transition>
  );

  const CONTENT = (
    <div className="form-control">
      <Combobox
        value={selected}
        onChange={(command) => {
          setSelected(command);
          uiAction.toggleCommandPalette();
          command?.action();
        }}
      >
        <div className="relative">
          {COMBOBOX_AUTOCOMPLETE_INPUT}
          {COMBOBOX_OPTIONS}
        </div>
      </Combobox>
    </div>
  );

  return (
    <div
      className={`modal-box pointer-events-auto z-10 transition-all transform !scale-100 gap-4 [--tw-translate-y:0] max-h-full
      h-full sm:h-auto p-6 sm:p-6 self-start ${
        query.length === 0 ? "sm:mt-[25vh]" : "sm:mt-[25vh]"
      } flex flex-col rounded-none sm:rounded-xl
      overflow-auto sm:overflow-visible relative
    `}
    >
      {TITLE}
      {CONTENT}
      {GRADIENT_BG}
    </div>
  );
}
