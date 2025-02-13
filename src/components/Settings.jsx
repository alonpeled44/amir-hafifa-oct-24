import { useState, useRef } from "react";
import css from "../styles/settings.module.css";
import settingsIcon from "../images/settings-icon.png";
import lightModeIcon from "../images/light-mode-icon.png";
import darkModeIcon from "../images/dark-mode-icon.png";
import fontIcon from "../images/Aa.png";

export default function Settings() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedFont, setSelectedFont] = useState("medium");
  const dialogRef = useRef(null);
}
