import { useState, useEffect } from "react";
import styles from "../styles/header.module.css";
import image from "../images/pokeball-closed.png";

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
    <header className={styles.header}>
      <img src={image.src} alt="Pokeball" />
      <h1>Pokémon</h1>
      {showDate && <p>{currentDate}</p>}
    </header>
  );
}
