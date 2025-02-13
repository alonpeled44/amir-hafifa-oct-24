import { useState, useRef } from "react";
import css from "../styles/settings.module.css";
import settingsIcon from "../images/settings-icon.png";
import lightModeIcon from "../images/light-mode-icon.png";
import darkModeIcon from "../images/dark-mode-icon.png";
import fontIcon from "../images/Aa.png";

export default function Settings (){
    const [selectedTheme, setSelectedTheme] = useState("light");
    const [selectedFont, setSelectedFont] = useState("medium");
    const dialogRef = useRef(null);

}




































export default function Settings() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedFont, setSelectedFont] = useState("medium");
  const dialogRef = useRef(null);

  return (
    <>
      <button
        className={css.settingsButton}
        onClick={() => dialogRef.current.showModal()}
      >
        <img src={settingsIcon.src} alt="Settings" />
      </button>

      <dialog ref={dialogRef} className={css.dialog}>
        <div className={css.dialogContent}>
          <h2>Settings</h2>

          <div className={css.optionGroup}>
            <h3>Theme</h3>
            <div className={css.options}>
              <button
                className={`${css.option} ${
                  selectedTheme === "light" ? css.selected : ""
                }`}
                onClick={() => setSelectedTheme("light")}
              >
                <img src={lightModeIcon.src} alt="Light Mode" />
                <span>Light</span>
              </button>
              <button
                className={`${css.option} ${
                  selectedTheme === "dark" ? css.selected : ""
                }`}
                onClick={() => setSelectedTheme("dark")}
              >
                <img src={darkModeIcon.src} alt="Dark Mode" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          <div className={css.optionGroup}>
            <h3>Font Size</h3>
            <div className={css.options}>
              <button
                className={`${css.option} ${
                  selectedFont === "small" ? css.selected : ""
                }`}
                onClick={() => setSelectedFont("small")}
              >
                <img src={fontSmallIcon.src} alt="Small Font" />
                <span>Small</span>
              </button>
              <button
                className={`${css.option} ${
                  selectedFont === "medium" ? css.selected : ""
                }`}
                onClick={() => setSelectedFont("medium")}
              >
                <img src={fontMediumIcon.src} alt="Medium Font" />
                <span>Medium</span>
              </button>
              <button
                className={`${css.option} ${
                  selectedFont === "large" ? css.selected : ""
                }`}
                onClick={() => setSelectedFont("large")}
              >
                <img src={fontLargeIcon.src} alt="Large Font" />
                <span>Large</span>
              </button>
            </div>
          </div>

          <button
            className={css.closeButton}
            onClick={() => dialogRef.current.close()}
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
}
