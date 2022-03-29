import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { ID_MODAL_BACK_BUTTON } from "../utils/helpers/constants/ConstantIds";

export default function ModalBackButton({ action }: { action: () => void }) {
  return (
    <label
      id={ID_MODAL_BACK_BUTTON}
      // [background-color:hsl(var(--bc)_/_0.3)]
      className="btn-outline btn btn-secondary btn-circle flex items-center 
      justify-center border-0 bg-primary/30 !text-3xl leading-none ![color:hsl(var(--bc))]
      shadow-lg"
      onClick={() => action()}
    >
      <FaArrowLeft />
    </label>
  );
}
