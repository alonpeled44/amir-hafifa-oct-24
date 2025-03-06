import React, { useEffect, useRef, useState } from "react";
import { Nullable, Pokemon, StateSetter } from "../libs/types";
import css from "../styles/pokemon-dialog.module.css";

type Props = {
  pokemon: Nullable<Pokemon>,
  isDialogOpen: boolean,
  setIsDialogOpen: StateSetter<boolean>,
}

export default function PokemonDialog({
  pokemon,
  isDialogOpen,
  setIsDialogOpen,
}: Props) {
  const dialogRef = useRef<Nullable<HTMLDialogElement>>(null);
  const contentRef = useRef<Nullable<HTMLDivElement>>(null);

  const [isDesktopMode, setIsDesktopMode] = useState(true);
  const [isShiny, setIsShiny] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopMode(window.innerWidth > 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current?.close();

      if (isDialogOpen) {
        isDesktopMode
          ? dialogRef.current.showModal()
          : dialogRef.current.show();
      }
    }
  }, [isDesktopMode, isDialogOpen]);

  if (!pokemon) return null;

  return isDialogOpen ? (
    <dialog
      ref={dialogRef}
      className={css.dialog}
      onClick={(event) => {
        event.stopPropagation();
        if (dialogRef.current && event.target instanceof Node && !contentRef.current?.contains(event.target)) {
          dialogRef.current.close();
          setIsDialogOpen(false);
          setIsShiny(false);
        }
      }}
    >
      <div
        ref={contentRef}
        className={css.dialogContent}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={css.closeButton}
          onClick={() => {
            setIsDialogOpen(false);
            setIsShiny(false);
          }}
        >
          &#x2716;
        </button>
        <div className={css.header}>
          <h1>{pokemon.name}</h1>
          <div className={css["right-side"]}>
            <label className={css["shiny-toggle"]}>
              <input
                type="checkbox"
                checked={isShiny}
                onChange={() => setIsShiny(!isShiny)}
              />
              <p>Shiny</p>
            </label>
            <p className={css.number}>#{pokemon.number}</p>
          </div>
        </div>
        <div className={css.body}>
          <div className={css.imageContainer}>
            <img
              src={isShiny ? pokemon.frontImageShiny : pokemon.frontImageNormal}
              alt="Front"
            />
            <img
              src={isShiny ? pokemon.backImageShiny : pokemon.backImageNormal}
              alt="Back"
            />
          </div>
          <div className={css.info}>
            <p>Type: {pokemon.type.join(", ")}</p>
            <p>Weight: {pokemon.weight}</p>
            <p>Height: {pokemon.height}</p>
          </div>
        </div>
      </div>
    </dialog>
  ) : undefined;
}
