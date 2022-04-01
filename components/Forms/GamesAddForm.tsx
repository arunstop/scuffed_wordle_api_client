import { Combobox, Transition } from "@headlessui/react";
import _ from "lodash";
import React, { Fragment, useState } from "react";
import { BiBrain, BiWorld } from "react-icons/bi";
import { HiBan, HiSelector } from "react-icons/hi";
import { MdCheck, MdRefresh } from "react-icons/md";
import { TiSortAlphabetically } from "react-icons/ti";
import { useGameContext } from "../../utils/contexts/game/GameHooks";
import { generateGameData } from "../../utils/contexts/game/GameProvider";
import { GameDifficulty } from "../../utils/models/GameModel";
import { TimeZone } from "../../utils/models/TimeZoneModel";
import GroupInput from "../GroupInput";
import TextInput from "../TextInput";

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
  onClose?: (value: boolean) => void;
}
export default function GamesAddForm({
  actionY = () => null,
  onClose = () => null,
}: GamesAddFormProps) {
  const {
    getters: { timeZoneList },
    action: gameAction,
  } = useGameContext();

  const [name, setName] = useState("");
  const [matrixX, setMatrixX] = useState(4);
  const [matrixY, setMatrixY] = useState(5);
  const [matrixZ, setMatrixZ] = useState(1);
  const [difficulty, setDifficulty] = useState("EASY");
  const [refreshInterval, setRefreshInterval] = useState("");
  const [bannedWords, setBannedWords] = useState("");
  const [timeZone, setTimeZone] = useState(timeZoneList[0]);
  const [query, setQuery] = useState("");

  // Mapping an enum
  const gameDifficultyList = Object.values(GameDifficulty).filter(
    (e) => typeof e !== "number",
  );

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
    // alert("submit");
    gameAction.add({
      ...generateGameData(),
      name: name,
      matrix: { x: matrixX, y: matrixY, z: matrixZ },
      // EASY || NORMAL || HARD
      difficulty: difficulty as GameDifficulty,
      timeZone: {
        abbr: timeZone.abbr,
        offset: timeZone.offset,
        value: timeZone.value,
      },
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
    // alert(GameDifficulty[difficulty as GameDifficulty]);
    onClose(false);
    event.preventDefault();
  }

  const INPUT_NAME = (
    <TextInput
      label="Name :"
      type={"text"}
      icon={<TiSortAlphabetically className="" />}
      value={name}
      placeholder="Catchy board game name"
      onChange={(event) => setName(event.target.value)}
      rules={() =>
        (name !== "" ? "" : "Cannot be empty") ||
        (name.length >= 4 ? "" : "Minimum 4 letters")
      }
    />
  );

  const INPUT_MATRIX = (
    <div>
      <label className="label">
        <span className="label-text">Matrix :</span>
      </label>
      <div className="grid w-full gap-4 sm:inline-flex">
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
            (matrixX >= 4 ? "" : "Min. 4") || (matrixX <= 12 ? "" : "Max. 12")
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
            (matrixY >= 4 ? "" : "Min. 4") || (matrixY <= 12 ? "" : "Max. 12")
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
            (matrixZ >= 1 ? "" : "Min. 1") || (matrixZ <= 12 ? "" : "Max. 12")
          }
        />
      </div>
    </div>
  );

  const INPUT_DIFFICULTY = (
    <GroupInput
      label="Difficulty :"
      icon={<BiBrain />}
      noCheckIcon
      rules={() => ""}
    >
      {({ ...props }) => (
        <select
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
          className={`select-bordered select grow !font-normal capitalize 
          ${props.isSuccess ? "select-success" : "focus:select-primary"}`}
        >
          {/* Map the difficulty list */}
          {gameDifficultyList.map((e) => (
            <option key={e.toString()} value={e} className="capitalize">
              {(e + "").toLowerCase()}
            </option>
          ))}
        </select>
      )}
    </GroupInput>
  );

  const INPUT_TIME_ZONE = (
    <div className="relative">
      <GroupInput
        noCheckIcon
        icon={<BiWorld />}
        label="Time Zone :"
        rules={() => ""}
      >
        {({ isSuccess, ...props }) => (
          <Combobox value={timeZone} onChange={setTimeZone}>
            <div className="relative w-full">
              <Combobox.Input
                as={Fragment}
                displayValue={(timeZone: TimeZone) => timeZone.text}
                onChange={(event) => setQuery(event.target.value)}
              >
                <input
                  type="text"
                  placeholder="Game Name"
                  className={`input-bordered input w-full pr-8 
                  w-full !rounded-l-none !rounded-r-md
                  ${isSuccess ? "input-success" : "focus:input-primary"}
                `}
                />
              </Combobox.Input>
              <Combobox.Button className="absolute  inset-y-0 right-0 flex items-center pr-2">
                <HiSelector
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>
              <div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  afterLeave={() => setQuery("")}
                >
                  <Combobox.Options
                    className="absolute z-20 max-h-60 w-full overflow-auto rounded-md border-4
                  border-primary bg-base-100 py-1 text-base shadow-lg focus:outline-none sm:text-sm
                  "
                  >
                    {filteredTimeZoneList.length === 0 && query !== "" ? (
                      <div className="relative cursor-default select-none py-2 px-4 text-center">
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
                            }) => `cursor-default select-none relative py-2 pl-10 pr-4 !rounded-none 
                            ${active ? "text-white bg-primary/100" : ""}
                            ${
                              isSelected && !active
                                ? "bg-primary-content text-primary-focus"
                                : ""
                            }`}
                            value={tzItem}
                          >
                            <>
                              {/* time zone text e.g (GMT+07:00) Some Place */}
                              <p
                                className={`block truncate ${
                                  isSelected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {tzItem.text}
                              </p>
                              {/* Cehck icon */}
                              {isSelected ? (
                                <p
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 `}
                                >
                                  <MdCheck
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </p>
                              ) : null}
                            </>
                          </Combobox.Option>
                        );
                      })
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </div>
          </Combobox>
        )}
      </GroupInput>
    </div>
  );

  const INPUT_REFRESH_INTERVAL = (
    <TextInput
      label="Refresh Interval :"
      type={"text"}
      icon={<MdRefresh className="" />}
      value={refreshInterval}
      placeholder="12:00, 13:10..."
      min={1}
      max={12}
      onChange={(event) => setRefreshInterval(event.target.value)}
      rules={() => (refreshInterval !== "" ? "" : "Cannot be empty")}
    />
  );

  const INPUT_BANNED_WORDS = (
    <TextInput
      label="Banned Words :"
      type={"text"}
      icon={<HiBan className="" />}
      value={bannedWords}
      placeholder="word1,word2"
      min={1}
      max={12}
      onChange={(event) => setBannedWords(event.target.value)}
      rules={() => (bannedWords !== "" ? "" : "Cannot be empty")}
    />
  );

  const ACTION_BUTTONS = (
    <div className="flex flex-col gap-4">
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
      <button
        type="button"
        className="btn-outline btn"
        onClick={() => onClose(false)}
      >
        Cancel
      </button>
    </div>
  );
  return (
    <form name="gameAddForm" onSubmit={onSubmit}>
      <div className={`flex flex-col w-full gap-2`}>
        {/* Tailwind workaround */}
        <div className={`hidden bg-error/30 bg-primary/30`}></div>
        {INPUT_NAME}
        {/* MATRIX */}
        {INPUT_MATRIX}
        {/* Difficulty */}
        {INPUT_DIFFICULTY}
        {/* Timezone */}
        {INPUT_TIME_ZONE}
        {/* Refresh interval */}
        {INPUT_REFRESH_INTERVAL}
        {/* Banned words */}
        {INPUT_BANNED_WORDS}
        <div className="w-[10%] mx-auto h-1 rounded-lg bg-primary/30 my-4"></div>
        {/* Action buttons */}
        {ACTION_BUTTONS}
      </div>
    </form>
  );
}
