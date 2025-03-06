import css from "../styles/option-button.module.css";

type Props = {
  image: string,
  label?: string,
  isSelected?: boolean,
  onClick: () => void,
  sizeClass?: string,
}

export default function OptionButton({
  image,
  label,
  isSelected,
  onClick,
  sizeClass,
}: Props) {
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
