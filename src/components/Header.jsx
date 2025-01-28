import { useState, useEffect } from "react";
import image from "../images/pokeball-closed.png";
import style from "../styles/header.module.css";

export default function Header() {
  const [showDate, setShowDate] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowDate(window.innerWidth > 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentDate = new Date().toLocaleDateString("en-GB");

  return (
    <header className={style.header}>
      <img src={image.src} alt="Pokeball" />
      <h1>Pokémon</h1>
      {showDate && <p>{currentDate}</p>}
    </header>
  );
}
