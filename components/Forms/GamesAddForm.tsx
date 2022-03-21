import React, { Fragment, ReactNode, useState } from "react";
import { HiBan } from "react-icons/hi";
import { TiSortAlphabetically } from "react-icons/ti";
import { BiWorld } from "react-icons/bi";
import { MdRefresh } from "react-icons/md";
import { useGameContext } from "../../utils/contexts/game/GameHooks";
import { TimeZone } from "../../utils/models/TimeZoneModel";
import { Combobox, Transition } from "@headlessui/react";
import { HiSelector } from "react-icons/hi";
import { MdCheck } from "react-icons/md";
import Alert from "../Alert";
import TextInput from "../TextInput";
import { generateGameData } from "../../utils/contexts/game/GameProvider";
import _ from "lodash";

// function timeZoneItem({ value, abbr, isDst, text, offset, utc }: TimeZone) {
//   return (
//     <div className="bg-primary-focus">
//       {/* <h2>{name}</h2>
//       <p>{label}</p> */}
//     </div>
//   );
// }

interface GamesAddFormProps {
  actionY?: () => void;
  onClose?: () => void;
}
export default function GamesAddForm({
  actionY = () => {},
  onClose = () => {},
}: GamesAddFormProps) {
  const {
    getters: { timeZoneList },
    action: gameAction,
  } = useGameContext();

  const [name, setName] = useState("");
  const [matrixX, setMatrixX] = useState(4);
  const [matrixY, setMatrixY] = useState(5);
  const [matrixZ, setMatrixZ] = useState(1);
  const [refreshInterval, setRefreshInterval] = useState("");
  const [bannedWords, setBannedWords] = useState("");
  const [timeZone, setTimeZone] = useState(timeZoneList[0]);
  const [query, setQuery] = useState("");

  const nameAlert = (): ReactNode => {
    if (name == "xd") {
      return <Alert color="error" label="Cannot be empty" />;
    }
  };

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

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    alert("submit");
    gameAction.add({
      ...generateGameData(),
      name: name,
      matrix: { x: matrixX, y: matrixY, z: matrixZ },
      timeZone: timeZone.text,
      utcOffset: timeZone.offset,
      // trimming empty value in array
      refreshInterval: _.filter(
        refreshInterval.replaceAll(" ", "").split(","),
        (e) => e !== "",
      ),
      bannedWordList: _.filter(
        bannedWords.replaceAll(" ", "").split(","),
        (e) => e !== "",
      ),
    });
    onClose();
    event.preventDefault();
  }

  console.log("render");
  return (
    <form name="gameAddForm" onSubmit={onSubmit}>
      <div className={`flex flex-col w-full`}>
        {/* Name */}

        <TextInput
          label="Name :"
          type={"text"}
          icon={<TiSortAlphabetically className="" size={30} />}
          value={name}
          placeholder="Catchy board game name"
          onChange={(event) => setName(event.target.value)}
          rules={() =>
            (name !== "" ? "" : "Cannot be empty") ||
            (name.length >= 8 ? "" : "Minimum 7 letters")
          }
        />
        {/* MATRIX */}
        <div>
          <label className="label">
            <span className="label-text">Matrix :</span>
          </label>
          <div className="inline-flex gap-4 w-full">
            <TextInput
              type={"number"}
              icon={"X"}
              value={matrixX}
              placeholder="4-12"
              min={4}
              max={12}
              // cast to number with +
              onChange={(event) => setMatrixX(+event.target.value)}
              rules={() =>
                // (matrixX === 0 ? "" : "Cannot be empty") ||
                (matrixX >= 4 ? "" : "Min. 4") ||
                (matrixX <= 12 ? "" : "Max. 12")
              }
            />
            {/* {matrixX} */}
            <TextInput
              type={"number"}
              icon={"Y"}
              value={matrixY}
              placeholder="4-12"
              min={4}
              max={12}
              onChange={(event) => setMatrixY(+event.target.value)}
              rules={() =>
                // (matrixY === 0 ? "" : "Cannot be empty") ||
                (matrixY >= 4 ? "" : "Min. 4") ||
                (matrixY <= 12 ? "" : "Max. 12")
              }
            />
            <TextInput
              type={"number"}
              icon={"Z"}
              value={matrixZ}
              placeholder="4-12"
              min={1}
              max={12}
              onChange={(event) => setMatrixZ(+event.target.value)}
              rules={() =>
                // (matrixZ === 0 ? "" : "Cannot be empty") ||
                (matrixZ >= 1 ? "" : "Min. 1") ||
                (matrixZ <= 12 ? "" : "Max. 12")
              }
            />
          </div>
        </div>
        {/* Timezone */}
        <div className="w-full">
          <label className="label">
            <span className="label-text">Time Zone :</span>
          </label>
          <Combobox value={timeZone} onChange={setTimeZone}>
            <div className="relative">
              <div>
                <label className="input-group">
                  <span className="bg-primary bg-opacity-30">
                    <BiWorld className="" size={30} />
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
                  className="absolute w-full py-1 overflow-auto text-base border-4 border-primary
                bg-base-100 rounded-md shadow-lg max-h-60 focus:outline-none sm:text-sm"
                >
                  {filteredTimeZoneList.length === 0 && query !== "" ? (
                    <div className="cursor-default select-none relative py-2 px-4 text-center">
                      Nothing found.
                    </div>
                  ) : (
                    filteredTimeZoneList.map((tzItem) => {
                      const isSelected: boolean =
                        tzItem.text === timeZone.text;
                      return (
                        <Combobox.Option
                          key={tzItem.text}
                          className={({
                            active,
                          }) => `cursor-default select-none relative py-2 pl-10 pr-4 
                        ${active ? "text-white bg-primary bg-opacity-100" : ""}
                        ${
                          isSelected && !active
                            ? "bg-primary-content text-primary-focus"
                            : ""
                        }
                        `}
                          value={tzItem}
                        >
                          <>
                            {/* time zone text e.g (GMT+07:00) Some Place */}
                            <span
                              className={`block truncate ${
                                isSelected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {tzItem.text}
                            </span>
                            {/* Cehck icon */}
                            {isSelected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 `}
                              >
                                <MdCheck
                                  className="w-6 h-6"
                                  aria-hidden="true"
                                />
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
        {/* Refresh interval */}

        <TextInput
          label="Refresh Interval :"
          type={"text"}
          icon={<MdRefresh className="" size={30} />}
          value={refreshInterval}
          placeholder="12:00, 13:10..."
          min={1}
          max={12}
          onChange={(event) => setRefreshInterval(event.target.value)}
          rules={() => (refreshInterval !== "" ? "" : "Cannot be empty")}
        />
        <TextInput
          label="Banned Words :"
          type={"text"}
          icon={<HiBan className="" size={30} />}
          value={bannedWords}
          placeholder="word1,word2"
          min={1}
          max={12}
          onChange={(event) => setBannedWords(event.target.value)}
          rules={() => (bannedWords !== "" ? "" : "Cannot be empty")}
        />
        <div className="flex flex-col mt-4 gap-4">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => onClose()}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
