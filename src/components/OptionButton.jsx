import css from "../styles/option-button.module.css";

export default function OptionButton({
  image,
  label,
  isSelected,
  onClick,
  sizeClass,
}) {
  return (
    <button
      onClick={onClick}
      className={`${css[isSelected ? "selected" : ""]} ${css["option-button"]}`}
    >
      <img src={image} alt={label} className={sizeClass} />
      {label && <p>{label}</p>}
    </button>
  );
}
