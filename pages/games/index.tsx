// import { Transition } from "@headlessui/react";
import { nanoid } from "nanoid";
import Head from "next/head";
import { NextRouter, useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
// import Modal from "../../components/Modal";
import { BsFillEmojiNeutralFill } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdClose, MdDelete, MdEdit, MdSearch } from "react-icons/md";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Alert from "../../components/Alert";
import Drawer from "../../components/Drawer/Drawer";
import GamesAddForm from "../../components/Forms/GamesAddForm";
import HeadlessModal from "../../components/HeadlessModal";
import { useGameContext } from "../../utils/contexts/game/GameHooks";
import { generateGameData } from "../../utils/contexts/game/GameProvider";
// import {GiTumbleweed} from "react-icons/gi";
// import { ID_MAIN_DRAWER } from "../utils/constants/ConstantIds";
import { APP_NAME } from "../../utils/helpers/constants/ConstantText";
// import { useUiContext } from "../../utils/contexts/ui/UiHooks";
import { strGameMatrix } from "../../utils/models/GameModel";
// import { Transition } from "@headlessui/react";
// import { useCountContext } from "../utils/contexts/counter/CounterHooks";
// import { useUiContext } from "../utils/contexts/ui/UiHooks";

export default function Dashboard() {
  const router: NextRouter = useRouter();
  // giving alias with colon (:)
  // const { state: countState, action: countAction } = useCountContext();
  const [modalAdd, setModalAdd] = useState(false);
  const [modalClear, setModalClear] = useState(false);
  const [alertInfo, setAlertInfo] = useState(true);

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
  const anim = "animated animated-backInUp animated-faster";

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
        <div className="flex grow flex-col gap-y-4 p-4">
          <button className="btn" onClick={() => setAlertInfo(!alertInfo)}>
            Toggle alert
          </button>
          {/* <Transition
            show={alertInfo}
            enter="transition-all duration-75"
            enterFrom="scale-0"
            enterTo="scale-100"
            leave="transition-all duration-150"
            leaveFrom="scale-100"
            leaveTo="scale-0"
          >
            <Alert
              color="info"
              title="Games page are used to manage games"
              subtitle={`Users create games with their desired format, different matrix, different difficulty, different refresh time, etc.`}
              action={() => setAlertInfo(false)}
              actionLabel="I understand"
            />
          </Transition> */}
          <CSSTransition
            in={alertInfo}
            classNames={{
              enter: "animated animated-faster",
              enterActive: "animated-zoomIn animated-faster",
              exit: "animated animated-faster",
              exitActive: "animated-zoomOut animated-faster",
            }}
            timeout={200}
            unmountOnExit
          >
            <Alert
              color="info"
              title="Games page are used to manage games"
              subtitle={`Users create games with their desired format, different matrix, different difficulty, different refresh time, etc.`}
              action={() => setAlertInfo(false)}
              actionLabel="I understand"
            />
          </CSSTransition>

          <div className="flex flex-wrap items-center gap-4">
            <button
              // htmlFor={ID_MAIN_DRAWER}
              className="btn btn-primary btn-block gap-2 sm:w-auto"
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
              className="btn btn-primary btn-block gap-2 sm:w-auto"
              onClick={() => {
                addGame();
                // addGame();
              }}
            >
              Add random
              <IoMdAddCircleOutline size={30} />
            </button>
            <button
              // htmlFor="games-clearall-modal"
              className={`btn gap-2 sm:w-auto btn-block 
              ${searchedList.length !== 0 ? `btn-secondary` : `btn-disabled`}`}
              onClick={() => {
                setModalClear(true);
                // addGame();
              }}
            >
              Clear all ({searchedList.length})
              <MdClose size={30} />
            </button>
            {/* Search bar */}
            <div className="form-control relative w-full sm:w-auto">
              <label className="input-group-md input-group">
                <span className="text-2xl sm:text-3xl">
                  <MdSearch />
                </span>
                <input
                  type="text"
                  value={gameState.search || ""}
                  placeholder="Search..."
                  className={`input input-bordered input-secondary w-full pr-12 sm:max-w-xs `}
                  disabled={isEmpty}
                  onChange={onSearch}
                />
              </label>
              {isSearching && (
                <div className="absolute inset-y-2 right-2 my-auto animated animated-zoomIn animated-faster">
                  <label
                    className="btn-outline btn  h-full min-h-min w-9"
                    onClick={() => gameAction.search("")}
                  >
                    {/* ![color:hsl(var(--bc)_/_1)] */}
                    <span className="text-2xl sm:text-3xl">
                      <MdClose />
                    </span>
                  </label>
                </div>
              )}
            </div>
          </div>
          {searchedList.length === 0 ? (
            <div
              className={`flex flex-col items-center m-auto m gap-4 text-center transition-all mx-4 
              scale-50
              animated animated-jackInTheBox animated-faster`}
            >
              <div className="inline-flex items-center gap-1 text-4xl font-black text-warning ">
                <span className="mr-[0.42rem] hidden tracking-[-0.4rem] sm:block">
                  ¯\__
                </span>
                <BsFillEmojiNeutralFill className="text-6xl sm:text-9xl" />
                <span className="hidden tracking-[-0.4rem] sm:block">__/¯</span>
              </div>
              <h2 className="text-3xl font-bold">No results found</h2>
              <h2 className="text-lg">
                Try to add new data or change the search keyword.
              </h2>
            </div>
          ) : (
            <TransitionGroup
              component="div"
              className="flex flex-wrap justify-center gap-4 transition"
            >
              {searchedList.map((game, index) => (
                <CSSTransition
                  key={game.id}
                  classNames={{
                    enter: "animated",
                    enterActive: "animated-jackInTheBox",
                    exit: "animated duration-200",
                    exitActive: "animated-zoomOut",
                  }}
                  timeout={300}
                >
                  <div
                    className={`card card-compact shadow-lg border rounded-t-lg border-primary`}
                  >
                    <h2 className="card-title bg-primary p-4">{game.name}</h2>
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
                          className="btn btn-secondary btn-sm btn-circle"
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
            // <main className="flex flex-wrap justify-center gap-4 transtiion all">
            //   {searchedList.map((game, index) => (
            //     <Transition
            //       show={searchedList.includes(game)}
            //       appear
            //       key={game.id}
            //       as={"div"}
            //       className={"animated"}
            //       enter="duration-[300ms] "
            //       // if isBig show scaling animation
            //       // if it's not show slide up animation
            //       enterFrom={`scale-y-0 sm:scale-[1.5] origin-bottom sm:origin-center opacity-0`}
            //       enterTo={`scale-90 sm:scale-90 origin-bottom sm:origin-center opacity-100`}
            //       leave="sm:animated-zoomOut animated-fadeOutDownBig duration-200"
            //     >
            //       <div
            //         className={`card card-compact shadow-lg border rounded-t-lg border-primary`}
            //       >
            //         <h2 className="card-title bg-primary p-4">{game.name}</h2>
            //         <div className="card-body">
            //           <p>{strGameMatrix(game.matrix)}</p>
            //           <div className="card-actions justify-end">
            //             <button
            //               key={"btn-game-item-edit-" + index}
            //               className="btn btn-sm btn-circle"
            //               // onClick={() => deleteGame(game.id)}
            //             >
            //               <MdEdit size={18} />
            //             </button>
            //             <button
            //               key={"btn-game-item-delete-" + index}
            //               className="btn btn-secondary btn-sm btn-circle"
            //               onClick={() => deleteGame(game.id)}
            //             >
            //               <MdDelete size={18} />
            //             </button>
            //           </div>
            //         </div>
            //       </div>
            //     </Transition>
            //   ))}
            // </main>
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
        isBig
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
