import { useState, useEffect } from "react";
import image from "../images/pokeball-closed.png";
import UserMenu from "../components/UserMenu";
import PokedexLink from "../components/PokedexLink";
import Divider from "../components/Divider";
import Settings from "../components/Settings";
import { useRouter } from "next/router";
import css from "../styles/header.module.css";

export default function Header() {
  const [isDesktopMode, setIsDesktopMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopMode(window.innerWidth > 1200);
    };

    const updateLoginStatus = () => {
      setIsLoggedIn(!!localStorage.getItem("username"));
    };

    handleResize();
    updateLoginStatus();

    window.addEventListener("resize", handleResize);
    window.addEventListener("storage", updateLoginStatus);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("storage", updateLoginStatus);
    };
  }, [router]);

  const currentDate = new Date().toLocaleDateString("en-GB");

  return (
    <header className={css.header}>
      <div>
        <img src={image.src} alt="Pokeball" />
        <h1>Pokémon</h1>
      </div>
      {isLoggedIn && (
        <>
          {isDesktopMode && <Divider />}
          <UserMenu setIsLoggedIn={setIsLoggedIn} />
          {isDesktopMode && <Divider />}
          <PokedexLink />
        </>
      )}
      {isDesktopMode && <p>{currentDate}</p>}
      {isLoggedIn && <Settings />}
    </header>
  );
}
