import { useState, useEffect, useRef } from "react";
import settingsIcon from "../images/settings-icon.png";
import ThemeSelector from "./ThemeSelector";
import FontSizeSelector from "./FontSizeSelector";
import css from "../styles/settings.module.css";

export default function Settings() {
  const [selectedTheme, setSelectedTheme] = useState(
    localStorage.getItem("theme") ?? "light"
  );
  const [selectedFont, setSelectedFont] = useState(
    localStorage.getItem("font-size") ?? "medium"
  );
  const [isDesktopMode, setIsDesktopMode] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const dialogRef = useRef(null);
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopMode(window.innerWidth > 1200);
      dialogRef.current.close();

      if (isDialogOpen) {
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

    if (isDialogOpen) {
      isDesktopMode ? dialogRef.current.showModal() : dialogRef.current.show();
    }
  }, [isDesktopMode, isDialogOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsDialogOpen(false);
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
          setIsDialogOpen((prev) => !prev);
        }}
      >
        <img src={settingsIcon.src} alt="Settings" />
      </button>

      <dialog
        ref={dialogRef}
        onClick={(e) => {
          e.stopPropagation();
          if (dialogRef.current && !contentRef.current.contains(e.target)) {
            setIsDialogOpen(false);
          }
        }}
      >
        <div
          ref={contentRef}
          className={`${css["dialog-content"]} ${
            showFontDropdown ? css["dropdown-open"] : ""
          }`}
        >
          {isDesktopMode && <h1>Settings</h1>}

          <div className={css["settings-section"]}>
            {isDesktopMode && <p>Theme</p>}
            <ThemeSelector
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              isDesktopMode={isDesktopMode}
            />
          </div>

          <div className={css["settings-section"]}>
            {isDesktopMode && <p>Font Size</p>}
            <FontSizeSelector
              selectedFont={selectedFont}
              setSelectedFont={setSelectedFont}
              isDesktopMode={isDesktopMode}
              showFontDropdown={showFontDropdown}
              setShowFontDropdown={setShowFontDropdown}
            />
          </div>

          {isDesktopMode && (
            <button
              className={css["close-settings-button"]}
              onClick={() => setIsDialogOpen(false)}
            >
              Close
            </button>
          )}
        </div>
      </dialog>
    </div>
  );
}
