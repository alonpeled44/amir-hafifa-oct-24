import { useState } from "react";
import css from "../styles/font-size-selector.module.css";
import OptionButton from "./OptionButton";
import fontIcon from "../images/Aa.png";

export default function FontSizeSelector({
  selectedFont,
  setSelectedFont,
  showInDesktop,
  showFontDropdown,
  setShowFontDropdown,
}) {
  // const [showFontDropdown, setShowFontDropdown] = useState(false);
  const fontSizes = ["small", "medium", "large"];

  return (
    <div className={css["font-selector"]}>
      {showInDesktop ? (
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
            onClick={() => setShowFontDropdown(!showFontDropdown)}
            sizeClass={css[selectedFont]}
          />

          {showFontDropdown && (
            <div className={css["font-dropdown"]}>
              {fontSizes
                .filter((size) => size !== selectedFont)
                .map((size) => (
                  <OptionButton
                    key={size}
                    image={fontIcon.src}
                    isSelected={false}
                    onClick={() => setSelectedFont(size)}
                    sizeClass={css[size]}
                  />
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
