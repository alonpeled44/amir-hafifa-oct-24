import image from "../images/pokeball-closed.png";
import css from "../styles/header.module.css";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-gb");

  return (
    <header className={css.header}>
      <img src={image.src} alt="Pokeball" />
      <h1>Pokémon</h1>
      <p>{currentDate}</p>
    </header>
  );
}
