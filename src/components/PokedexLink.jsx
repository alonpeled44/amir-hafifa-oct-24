import Link from "next/link";
import css from "../styles/pokedex-link.module.css";

export default function PokedexLink() {
  return (
    <Link href="/" className={css["pokedex-link"]}>
      Pokedex
    </Link>
  );
}
