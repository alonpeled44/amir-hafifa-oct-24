import { useEffect } from "react";
import OptionButton from "./OptionButton";
import lightModeIcon from "../images/light-mode-icon.png";
import darkModeIcon from "../images/dark-mode-icon.png";
import css from "../styles/theme-selector.module.css";

export default function ThemeSelector({
  selectedTheme,
  setSelectedTheme,
  isDesktopMode,
}) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  }, [selectedTheme]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setSelectedTheme(savedTheme);
    }
  }, [setSelectedTheme]);

  return (
    <div className={css["theme-selector"]}>
      {isDesktopMode ? (
        <div className={css.options}>
          <OptionButton
            image={lightModeIcon.src}
            label="Light"
            isSelected={selectedTheme === "light"}
            onClick={() => setSelectedTheme("light")}
          />
          <OptionButton
            image={darkModeIcon.src}
            label="Dark"
            isSelected={selectedTheme === "dark"}
            onClick={() => setSelectedTheme("dark")}
          />
        </div>
      ) : (
        <OptionButton
          image={
            selectedTheme === "light" ? lightModeIcon.src : darkModeIcon.src
          }
          onClick={() =>
            setSelectedTheme(selectedTheme === "light" ? "dark" : "light")
          }
        />
      )}
    </div>
  );
}
