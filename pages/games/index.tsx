import { nanoid } from "nanoid";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdClose, MdDelete, MdEdit, MdSearch } from "react-icons/md";
import Drawer from "../../components/Drawer/Drawer";
// import Modal from "../../components/Modal";
import { BsFillEmojiNeutralFill } from "react-icons/bs";
// import {GiTumbleweed} from "react-icons/gi";
// import { ID_MAIN_DRAWER } from "../utils/constants/ConstantIds";
import { APP_NAME } from "../../utils/helpers/constants/ConstantText";
import { useGameContext } from "../../utils/contexts/game/GameHooks";
import { generateGameData } from "../../utils/contexts/game/GameProvider";
// import { useUiContext } from "../../utils/contexts/ui/UiHooks";
import { strGameMatrix } from "../../utils/models/GameModel";
import HeadlessModal from "../../components/HeadlessModal";
import GamesAddForm from "../../components/Forms/GamesAddForm";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import { useCountContext } from "../utils/contexts/counter/CounterHooks";
// import { useUiContext } from "../utils/contexts/ui/UiHooks";

export default function Dashboard() {
  const router: NextRouter = useRouter();
  // giving alias with colon (:)
  // const { state: countState, action: countAction } = useCountContext();
  const [modalAdd, setModalAdd] = useState(false);
  const [modalClear, setModalClear] = useState(false);

  useEffect(() => {
    // if (uiState.menuOn !== "games") {
    //   uiAction.selectMenu("games");
    // }
  });

  const {
    state: gameState,
    action: gameAction,
    getters: { isSearching, searchedList, isEmpty },
  } = useGameContext();
  // const gameList = searchedList;
  // const gameList = gameState.list;

  function getId(): string {
    const newId = nanoid();
    if (searchedList.map((game) => game.id).includes(newId)) return getId();
    return newId;
  }

  function addGame() {
    gameAction.add(generateGameData(getId()));
  }
  function deleteGame(gameId: string) {
    gameAction.delete(gameId);
  }
  function onSearch(event: ChangeEvent<HTMLInputElement>) {
    gameAction.search(event.target.value);
  }
  const anim: string = "animated animated-backInUp animated-faster";

  return (
    // <CounterProvider>
    <>
      <Head>
        <title>Games - {APP_NAME}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Drawer>
        {/* CONTENT */}
        <div className="flex flex-col p-2 lg:p-4 gap-y-4 flex-grow">
          <div className="flex flex-wrap items-center gap-4">
            <button
              // htmlFor={ID_MAIN_DRAWER}
              className="btn btn-primary gap-2 lg:btn-lg lg:text-lg btn-md"
              onClick={() => {
                setModalAdd(true);
                // addGame();
              }}
            >
              Add games ({gameState.list.length})
              <IoMdAddCircleOutline size={30} />
            </button>
            <button
              // htmlFor={ID_MAIN_DRAWER}
              className="btn btn-primary gap-2 lg:btn-lg lg:text-lg btn-md"
              onClick={() => {
                gameAction.add(generateGameData());
                // addGame();
              }}
            >
              Add random
              <IoMdAddCircleOutline size={30} />
            </button>
            <label
              // htmlFor="games-clearall-modal"
              className={`btn gap-2 lg:btn-lg lg:text-lg btn-md ${
                searchedList.length !== 0 || !isSearching
                  ? `btn-error`
                  : `btn-disabled`
              }`}
              onClick={() => {
                setModalClear(true);
                // addGame();
              }}
            >
              Clear all ({searchedList.length})
              <MdClose size={30} />
            </label>
            {/* Search bar */}
            <div className="form-control">
              <label className="input-group lg:input-group-lg input-group-md">
                <span>
                  <MdSearch size={30} />
                </span>
                <input
                  type="search"
                  placeholder="Search..."
                  className={`input input-bordered input-secondary w-full max-w-xs lg:input-lg input-md`}
                  value={gameState.search || ""}
                  disabled={isEmpty}
                  onChange={onSearch}
                />
              </label>
            </div>
          </div>
          {searchedList.length === 0 ? (
            <div
              className={`flex flex-col items-center m-auto m gap-4 text-center transition-all
              scale-50
              animated animated-jackInTheBox animated-faster`}
            >
              <div className="inline-flex items-center text-4xl font-black gap-1 text-warning ">
                <span className="sm:block hidden tracking-[-0.4rem] mr-[0.42rem]">¯\__</span>
                <BsFillEmojiNeutralFill className="sm:text-9xl text-6xl" />
                <span className="sm:block hidden tracking-[-0.4rem]">__/¯</span>
              </div>
              <h2 className="text-3xl font-bold">No results found</h2>
              <h2 className="text-lg">
                Try to add new data or change the search keyword.
              </h2>
            </div>
          ) : (
            <TransitionGroup component="div" className="flex flex-wrap justify-center gap-4 transition" >
              {searchedList.map((game, index) => (
                <CSSTransition key={game.id} classNames={{
                  enter:"animated",
                  enterActive: "animated-jackInTheBox",
                  exit:"animated duration-200",
                  exitActive:"animated-zoomOut",
                }}
                timeout={300}
                >
                  <div
                    className={`card card-compact shadow-lg outline outline-1 outline-primary 
                    `}
                  >
                    <h2 className="card-title p-4 bg-primary">{game.name}</h2>
                    <div className="card-body">
                      <p>{strGameMatrix(game.matrix)}</p>
                      <div className="card-actions justify-end">
                        <button
                          key={"btn-game-item-edit-" + index}
                          className="btn btn-sm btn-circle"
                          // onClick={() => deleteGame(game.id)}
                        >
                          <MdEdit size={18} />
                        </button>
                        <button
                          key={"btn-game-item-delete-" + index}
                          className="btn btn-sm btn-circle btn-error"
                          onClick={() => deleteGame(game.id)}
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </CSSTransition>
              ))}
            </TransitionGroup>
          )}
        </div>
      </Drawer>
      {/* MODAL */}
      <HeadlessModal
        value={modalAdd}
        title="Add new Game"
        desc=""
        color="primary"
        labelY="Confirm addition"
        // clear searched items if exists
        onClose={(value) => {
          setModalAdd(value);
        }}
        big
      >
        <GamesAddForm onClose={() => setModalAdd(false)} />
      </HeadlessModal>
      <HeadlessModal
        value={modalClear}
        title="Clear All Game Data"
        desc="All game data will be wiped out. This action cannot be undone. Use it wisely!"
        color="error"
        labelY="Clear"
        // clear searched items if exists
        actionY={() =>
          gameAction.clear([...searchedList.map((game) => game.id)])
        }
        onClose={(value) => {
          setModalClear(value);
        }}
      />
    </>
  );
}

// export default Dashboard;