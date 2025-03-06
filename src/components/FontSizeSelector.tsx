import { JSX, useEffect } from "react";
import fontIcon from "../images/Aa.png";
import OptionButton from "./OptionButton";
import css from "../styles/font-size-selector.module.css";
import { StateSetter } from "../libs/types";
const fontSizes = ["small", "medium", "large"];

type Props = {
  selectedFont: string,
  setSelectedFont: StateSetter<string>,
  isDesktopMode: boolean,
  showFontDropdown: boolean,
  setShowFontDropdown: StateSetter<boolean>,
}

export default function FontSizeSelector({
  selectedFont,
  setSelectedFont,
  isDesktopMode,
  showFontDropdown,
  setShowFontDropdown,
}: Props) {
  useEffect(() => {
    document.documentElement.setAttribute("data-font-size", selectedFont);
    localStorage.setItem("font-size", selectedFont);
  }, [selectedFont]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("font-size");
    if (savedFontSize) {
      setSelectedFont(savedFontSize);
    }
  }, []);

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
                {fontSizes.reduce((acc: JSX.Element[], size) => {
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
