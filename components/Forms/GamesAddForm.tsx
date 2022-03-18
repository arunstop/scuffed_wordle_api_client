import React from "react";
import { HiBan } from "react-icons/hi";
import { TiSortAlphabetically } from "react-icons/ti";
import { BiWorld } from "react-icons/bi";
import { MdRefresh } from "react-icons/md";

export default function GamesAddForm() {
  return (
    <div className={`flex flex-col w-full bg-base-300 gap-4`}>
      {/* Name */}
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <label className="input-group">
          <span className="bg-primary">
            <TiSortAlphabetically size={30} />
          </span>
          <input
            type="text"
            placeholder="Game Name"
            className="input input-bordered w-full"
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
              <span className="bg-primary font-black text-3xl">X</span>
              <input
                type="number"
                placeholder="1 - 12"
                min={4}
                max={12}
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="input-group">
              <span className="bg-primary font-black text-3xl">Y</span>
              <input
                type="number"
                placeholder="1 - 12"
                min={1}
                max={12}
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="input-group">
              <span className="bg-primary font-black text-3xl">Z</span>
              <input
                type="number"
                placeholder="1 - 12"
                min={1}
                max={12}
                className="input input-bordered w-full"
              />
            </label>
          </div>
        </div>
      </div>
      {/* Timezone */}
      <div>
        {/* <label className="label">
          <span className="label-text">Name</span>
        </label> */}
        <div className="inline-flex w-full gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Timezone</span>
            </label>
            <label className="input-group">
              <span className="bg-primary">
                <BiWorld size={30} />
              </span>
              <input
                type="text"
                placeholder="Game Name"
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Refresh Interval</span>
            </label>
            <label className="input-group">
              <span className="bg-primary">
                <MdRefresh size={30} />
              </span>
              <input
                type="text"
                placeholder="Game Name"
                className="input input-bordered w-full"
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
            <HiBan size={30} />
          </span>
          <input
            type="text"
            placeholder="1 - 12"
            className="input input-bordered w-full"
          />
        </label>
      </div>
    </div>
  );
}
