import { Combobox, Transition } from "@headlessui/react";
import _ from "lodash";
import React, { Fragment, useState } from "react";
import { FaArrowLeft, FaTerminal } from "react-icons/fa";
import { HiSelector } from "react-icons/hi";
// import { MdCheck } from "react-icons/md";
import { useUiContext } from "../../utils/contexts/ui/UiHooks";
import { UiMenu } from "../../utils/models/UiModel";
// import TextInput from "../TextInput";

export default function CommandPaletteForm({
  onClose = () => null,
}: {
  onClose: (value: boolean) => void;
}) {
  const { state: uiState, action: uiAction } = useUiContext();
  const [selected, setSelected] = useState<UiMenu | null>();
  const [query, setQuery] = useState("");
  const filteredList = !query
    ? uiState.menuList
    : _.filter(uiState.menuList, (menu) =>
        menu.title.toLowerCase().trim().includes(query.toLowerCase().trim()),
      );
  return (
    <div
      className={`modal-box pointer-events-auto z-10 transition-all transform !scale-100 gap-4 [--tw-translate-y:0] max-h-full
      h-full sm:h-auto p-6 sm:p-6 self-start ${
        query.length === 0 ? "sm:mt-24" : "sm:mt-24"
      } flex flex-col rounded-none sm:rounded-xl
      overflow-auto sm:overflow-visible 
    `}
    >
      <div
        className={` text-2xl font-bold  flex items-center justify-between text-right`}
      >
        {/* BACK BUTTON */}
        <label
          // [background-color:hsl(var(--bc)_/_0.3)]
          className="btn-outline btn btn-secondary btn-circle flex items-center justify-center border-0 bg-primary/30 !text-3xl leading-none ![color:hsl(var(--bc))]"
          onClick={() => onClose(false)}
        >
          <FaArrowLeft />
        </label>
        <span className="self-center">Command Palette</span>
      </div>
      {/* {JSON.stringify(query)} */}
      <div className="form-control">
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative">
            <div>
              <label className="input-group">
                <span className="bg-primary/30 text-2xl sm:text-3xl">
                  <FaTerminal />
                </span>
                <Combobox.Input
                  as={Fragment}
                  displayValue={(menu: UiMenu) => menu.title}
                  onChange={(event) => setQuery(event.target.value)}
                >
                  <input
                    type="text"
                    placeholder="Search commands..."
                    className="input-bordered input w-full pr-8 focus:input-primary input-md sm:input-lg !rounded-r-xl"
                    autoFocus
                  />
                </Combobox.Input>
              </label>
              <Combobox.Button className="absolute  inset-y-0 right-0 flex items-center pr-2">
                <HiSelector
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
            </div>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options
                className="absolute max-h-60 w-full overflow-auto rounded-md rounded-t-sm bg-base-100
                 mt-2 text-base shadow-lg focus:outline-none"
              >
                {filteredList.length === 0 && query !== "" ? (
                  <div className="relative cursor-default select-none py-2 px-4 text-center">
                    Nothing found.
                  </div>
                ) : (
                  filteredList.map((menu) => {
                    const isSelected: boolean = menu.title === selected?.title;
                    return (
                      <Combobox.Option
                        key={menu.title}
                        className={({
                          active,
                        }) => `cursor-default select-none relative py-2 pl-10 pr-4 
                        ${active ? "text-white bg-primary/100" : ""}
                        ${
                          isSelected && !active
                            ? "bg-primary-content text-primary-focus"
                            : ""
                        }
                        `}
                        value={menu}
                      >
                        <>
                          {/* time zone text e.g (GMT+07:00) Some Place */}
                          <span
                            className={`block truncate ${
                              isSelected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {menu.title}
                          </span>
                          {/* Cehck icon */}
                          {/* {isSelected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 `}
                            >
                              <MdCheck className="h-6 w-6" aria-hidden="true" />
                            </span>
                          ) : null} */}
                        </>
                      </Combobox.Option>
                    );
                  })
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>
    </div>
  );
}
