import { useState, useEffect, useRef } from "react";
import css from "../styles/settings.module.css";
import ThemeSelector from "./ThemeSelector";
import FontSizeSelector from "./FontSizeSelector";
import settingsIcon from "../images/settings-icon.png";

export default function Settings() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedFont, setSelectedFont] = useState("medium");
  const [showInDesktop, setShowInDesktop] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const dialogRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setShowInDesktop(window.innerWidth > 1200);
      dialogRef.current.close();

      if (openDialog) {
        window.innerWidth > 1200
          ? dialogRef.current.showModal()
          : dialogRef.current.show();
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dialogRef.current.close();

    if (openDialog) {
      showInDesktop ? dialogRef.current.showModal() : dialogRef.current.show();
    }
  }, [showInDesktop, openDialog]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenDialog(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={css["settings-container"]}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenDialog((prev) => !prev);
        }}
      >
        <img src={settingsIcon.src} alt="Settings" />
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          e.stopPropagation();
          if (dialogRef.current && !contentRef.current.contains(e.target)) {
            setOpenDialog(false);
          }
        }}
      >
        <div
          ref={contentRef}
          className={`${css["dialog-content"]} ${
            showFontDropdown ? css["dropdown-open"] : ""
          }`}
        >
          {showInDesktop && <h1>Settings</h1>}

          <div className={css["settings-section"]}>
            {showInDesktop && <p>Theme</p>}
            <ThemeSelector
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              showInDesktop={showInDesktop}
            />
          </div>

          <div className={css["settings-section"]}>
            {showInDesktop && <p>Font Size</p>}
            <FontSizeSelector
              selectedFont={selectedFont}
              setSelectedFont={setSelectedFont}
              showInDesktop={showInDesktop}
              showFontDropdown={showFontDropdown}
              setShowFontDropdown={setShowFontDropdown}
            />
          </div>

          {showInDesktop && (
            <button
              className={css["close-settings-button"]}
              onClick={() => setOpenDialog(false)}
            >
              Close
            </button>
          )}
        </div>
      </dialog>
    </div>
  );
}
