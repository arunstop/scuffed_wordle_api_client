import React, { Fragment, useState } from "react";
import { HiBan } from "react-icons/hi";
import { TiSortAlphabetically } from "react-icons/ti";
import { BiWorld } from "react-icons/bi";
import { MdRefresh } from "react-icons/md";
import { useGameContext } from "../../utils/contexts/game/GameHooks";
import { TimeZone } from "../../utils/models/TimeZoneModel";
import { Combobox, Transition } from "@headlessui/react";
import { HiSelector } from "react-icons/hi";
import { MdCheck } from "react-icons/md";

function timeZoneItem({ value, abbr, isDst, text, offset, utc }: TimeZone) {
  return (
    <div className="bg-primary-focus">
      {/* <h2>{name}</h2>
      <p>{label}</p> */}
    </div>
  );
}
export default function GamesAddForm() {
  const {
    getters: { timeZoneList },
  } = useGameContext();

  const [selected, setSelected] = useState(timeZoneList[0]);
  const [query, setQuery] = useState("");

  // const filteredPeople =
  //   query === ""
  //     ? timeZoneList
  //     : timeZoneList.filter((person) =>
  //         person.text
  //           .toLowerCase()
  //           .replace(/\s+/g, "")
  //           .includes(query.toLowerCase().replace(/\s+/g, "")),
  //       );

  const filteredTimeZoneList =
    query === ""
      ? timeZoneList
      : timeZoneList.filter((timeZone) => {
          const validText: boolean = timeZone.text
            .toLowerCase()
            // .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""));
          const validUtcCodes: boolean = timeZone.utc
            .join()
            .toLowerCase()
            // .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""));
          return validText || validUtcCodes;
        });

  return (
    <div className={`flex flex-col w-full  gap-4`}>
      {/* Name */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <label className="input-group">
          <span className="bg-primary">
            <TiSortAlphabetically className="text-white" size={30} />
          </span>
          <input
            type="text"
            placeholder="Game Name"
            className="input input-bordered focus:input-primary w-full"
          />
        </label>
      </div>
      {/* MATRIX */}
      <div>
        <label className="label">
          <span className="label-text">Matrix :</span>
        </label>
        <div className="inline-flex gap-4 w-full">
          <div className="form-control w-full">
            <label className="input-group">
              <span className="bg-primary font-black text-3xl text-white">X</span>
              <input
                type="number"
                placeholder="1 - 12"
                min={4}
                max={12}
                className="input input-bordered focus:input-primary w-full"
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="input-group">
              <span className="bg-primary font-black text-3xl text-white">Y</span>
              <input
                type="number"
                placeholder="1 - 12"
                min={1}
                max={12}
                className="input input-bordered focus:input-primary w-full"
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="input-group">
              <span className="bg-primary font-black text-3xl text-white">Z</span>
              <input
                type="number"
                placeholder="1 - 12"
                min={1}
                max={12}
                className="input input-bordered focus:input-primary w-full"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="w-full">
        <label className="label">
          <span className="label-text">Refresh Interval</span>
        </label>
        <Combobox value={selected} onChange={setSelected}>
          <div className="relative">
            <div>
              <label className="input-group">
                <span className="bg-primary">
                  <BiWorld className="text-white" size={30} />
                </span>
                <Combobox.Input
                  as={Fragment}
                  displayValue={(timeZone: TimeZone) => timeZone.text}
                  onChange={(event) => setQuery(event.target.value)}
                >
                  <input
                    type="text"
                    placeholder="Game Name"
                    className="input input-bordered focus:input-primary w-full pr-8"
                  />
                </Combobox.Input>
              </label>
              <Combobox.Button className="absolute  inset-y-0 right-0 flex items-center pr-2">
                <HiSelector
                  className="w-5 h-5 text-gray-400"
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
                className="absolute w-full py-1 mt-1 overflow-auto text-base border-4 border-primary
              bg-white rounded-md shadow-lg max-h-60 focus:outline-none sm:text-sm"
              >
                {filteredTimeZoneList.length === 0 && query !== "" ? (
                  <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                    Nothing found.
                  </div>
                ) : (
                  filteredTimeZoneList.map((timeZone) => {
                    const isSelected: boolean = timeZone.text === selected.text;
                    return (
                      <Combobox.Option
                        key={timeZone.text}
                        className={({
                          active,
                        }) => `cursor-default select-none relative py-2 pl-10 pr-4 
                        ${
                          active
                            ? "text-white bg-primary bg-opacity-100"
                            : "text-gray-900"
                        }
                        ${
                          isSelected && !active
                            ? "bg-primary-content text-primary-focus"
                            : ""
                        }
                        `}
                        value={timeZone}
                      >
                        <>
                          <span
                            className={`block truncate ${
                              isSelected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {timeZone.text}
                          </span>
                          {isSelected ? (
                            <span
                              className={`absolute inset-y-0 left-0 flex items-center pl-3 `}
                            >
                              <MdCheck className="w-6 h-6" aria-hidden="true" />
                            </span>
                          ) : null}
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
      {/* Timezone */}
      <div>
        {/* <label className="label">
          <span className="label-text">Name</span>
        </label> */}
        {/* {timeZoneList.map((timeZone) => timeZoneItem(timeZone))} */}
        <div className="inline-flex w-full gap-4">
          {/* <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Timezone</span>
            </label>
            <label className="input-group">
              <span className="bg-primary">
                <BiWorld className="text-white" size={30} />
              </span>
              <input
                type="text"
                placeholder="Jakarta"
                className="input input-bordered focus:input-primary w-full"
              />
            </label>
          </div> */}
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Refresh Interval</span>
            </label>
            <label className="input-group">
              <span className="bg-primary">
                <MdRefresh className="text-white" size={30} />
              </span>
              <input
                type="text"
                placeholder="12:00,13:10..."
                className="input input-bordered focus:input-primary w-full"
              />
            </label>
          </div>
        </div>
      </div>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Banned Words</span>
        </label>
        <label className="input-group">
          <span className="bg-primary">
            <HiBan className="text-white" size={30} />
          </span>
          <input
            type="text"
            placeholder="1 - 12"
            className="input input-bordered focus:input-primary w-full"
          />
        </label>
      </div>
    </div>
  );
}
