import { useState } from "react";
import css from "../styles/filter-sort-selector.module.css";

export default function FilterSortSelector({
  selectedFilter,
  setSelectedFilter,
  options,
  label,
  isCheckbox = false,
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={css.selector}>
      <button onClick={() => setIsOpen((prev) => !prev)}>
        {label} <span className={isOpen ? css.open : ""}>▼</span>
      </button>
      {isOpen && (
        <div className={css.dropdown}>
          {options.map((option) => (
            <label key={option.value} className={css.option}>
              <input
                type={isCheckbox ? "checkbox" : "radio"}
                checked={
                  isCheckbox
                    ? selectedFilter.includes(option.value)
                    : selectedFilter === option.value
                }
                onChange={() => setSelectedFilter(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
