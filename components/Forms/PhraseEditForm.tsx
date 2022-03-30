import React, { useState } from "react";
import TextInput from "../TextInput";
import { BsChatQuote } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { useApiContext } from "../../utils/contexts/api/ApiHooks";
import { Phrase, PhraseType } from "../../utils/models/PhraseModel";
import _ from "lodash";

interface PhraseEditFormProps {
  onClose: (value: boolean) => void;
  phraseToEdit: Phrase | null;
}

export default function PhraseEditForm({
  onClose = () => {},
  phraseToEdit,
}: PhraseEditFormProps) {
  // Mapping an enum
  const phraseTypeList = Object.values(PhraseType).filter(
    (e) => typeof e !== "number",
  );
  const { state: apiState, action: apiAction } = useApiContext();
  const [text, setText] = useState(phraseToEdit?.text || "");
  const [type, setType] = useState(phraseToEdit?.type || "");
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (text !== "") {
      apiAction.phrase.edit({
        id: phraseToEdit?.id || "",
        text: text,
        type: PhraseType[type as PhraseType],
      });
      onClose(false);
    }
    event.preventDefault();
  }

  const INPUT_TEXT = (
    <TextInput
      type="text"
      value={text}
      onChange={(event) => setText(event.target.value)}
      label="Text :"
      placeholder="Say something..."
      icon={<BsChatQuote />}
      rules={() => (text !== "" ? "" : "Cannot be empty")}
      spellCheck={true}
    />
  );

  const INPUT_TYPE = (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">Type :</span>
      </label>
      <label className="input-group">
        <span className="bg-primary/30 text-2xl sm:text-3xl">
          <MdOutlineCategory />
        </span>
        <select
          value={type}
          onChange={(event) => setType(event.target.value as PhraseType)}
          className="select select-bordered active:select-primary grow font-normal capitalize"
        >
          {/* <option disabled selected>
            Choose type...
          </option> */}
          {_.map(phraseTypeList, (type) => (
            <option value={type}>Phrase on {type.toLowerCase()}</option>
          ))}
        </select>
      </label>
    </div>
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
    <form name="phraseAddForm" onSubmit={onSubmit}>
      <div className="flex flex-col w-full gap-2">
        {INPUT_TEXT}
        {INPUT_TYPE}
        <div className="w-[10%] mx-auto h-1 rounded-lg bg-primary/30 my-4"></div>
        {ACTION_BUTTONS}
      </div>
    </form>
  );
}
