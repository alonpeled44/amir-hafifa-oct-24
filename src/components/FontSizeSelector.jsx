import { useState } from "react";
import css from "../styles/font-size-selector.module.css";
import OptionButton from "./OptionButton";
import fontIcon from "../images/Aa.png";

export default function FontSizeSelector({
  selectedFont,
  setSelectedFont,
  isDesktopMode,
  showFontDropdown,
  setShowFontDropdown,
}) {
  const fontSizes = ["small", "medium", "large"];

  return (
    <div className={css["font-selector"]}>
      {isDesktopMode ? (
        <div className={css.options}>
          {fontSizes.map((size) => (
            <OptionButton
              key={size}
              image={fontIcon.src}
              label={size.charAt(0).toUpperCase() + size.slice(1)}
              isSelected={selectedFont === size}
              onClick={() => setSelectedFont(size)}
              sizeClass={css[size]}
            />
          ))}
        </div>
      ) : (
        <div className={css.options}>
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
        </div>
      )}
    </div>
  );
}
