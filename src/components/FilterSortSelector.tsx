import { useState } from "react";
import { StateSetter } from "../libs/types";
import css from "../styles/filter-sort-selector.module.css";

type Props = {
  selectedFilter: string[],
  setSelectedFilter: (type: string) => void | StateSetter<string>,
  options: string[],
  label: string,
  isCheckbox?: boolean,
}

export default function FilterSortSelector({
  selectedFilter,
  setSelectedFilter,
  options,
  label,
  isCheckbox = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.selector}>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        {label} <span className={isOpen ? css.open : ""}>▼</span>
      </button>
      {isOpen && (
        <div className={css.dropdown}>
          {options.map((option) => (
            <label key={option} className={css.option}>
              <input
                type={isCheckbox ? "checkbox" : "radio"}
                checked={selectedFilter.includes(option)}
                onChange={() => setSelectedFilter(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
