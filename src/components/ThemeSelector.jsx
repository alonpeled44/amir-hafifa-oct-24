import css from "../styles/theme-selector.module.css";
import OptionButton from "./OptionButton";
import lightModeIcon from "../images/light-mode-icon.png";
import darkModeIcon from "../images/dark-mode-icon.png";

export default function ThemeSelector({
  selectedTheme,
  setSelectedTheme,
  isDesktopMode,
}) {
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
