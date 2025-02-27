import { useEffect } from "react";
import fontIcon from "../images/Aa.png";
import OptionButton from "./OptionButton";
import css from "../styles/font-size-selector.module.css";
const fontSizes = ["small", "medium", "large"];

export default function FontSizeSelector({
  selectedFont,
  setSelectedFont,
  isDesktopMode,
  showFontDropdown,
  setShowFontDropdown,
}) {
  useEffect(() => {
    document.documentElement.setAttribute("data-font-size", selectedFont);
    localStorage.setItem("theme", selectedFont);
  }, [selectedFont]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("font-size");
    if (savedFontSize) {
      setSelectedFont(savedFontSize);
    }
  }, [setSelectedFont]);

  return (
    <div className={css["font-selector"]}>
      <div className={css.options}>
        {isDesktopMode ? (
          fontSizes.map((size) => (
            <OptionButton
              key={size}
              image={fontIcon.src}
              label={size}
              isSelected={selectedFont === size}
              onClick={() => setSelectedFont(size)}
              sizeClass={css[size]}
            />
          ))
        ) : (
          <>
            <OptionButton
              image={fontIcon.src}
              isSelected={true}
              onClick={() => setShowFontDropdown((prev) => !prev)}
              sizeClass={css[selectedFont]}
            />

            {showFontDropdown && (
              <div className={css["font-dropdown"]}>
                {fontSizes.reduce((acc, size) => {
                  if (size !== selectedFont) {
                    acc.push(
                      <OptionButton
                        key={size}
                        image={fontIcon.src}
                        isSelected={false}
                        onClick={() => setSelectedFont(size)}
                        sizeClass={css[size]}
                      />
                    );
                  }

                  return acc;
                }, [])}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
