import { useState, useEffect, useRef,} from "react";
import settingsIcon from "../images/settings-icon.png";
import ThemeSelector from "./ThemeSelector";
import FontSizeSelector from "./FontSizeSelector";
import css from "../styles/settings.module.css";
import { Nullable, User } from "../libs/types";

export default function Settings() {
  const [user, setUser] = useState<Nullable<User>>(null);
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedFont, setSelectedFont] = useState("medium");
  const [isDesktopMode, setIsDesktopMode] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);

  const dialogRef = useRef<Nullable<HTMLDialogElement>>(null);
  const containerRef = useRef<Nullable<HTMLDivElement>>(null);
  const contentRef = useRef<Nullable<HTMLDivElement>>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      return data as User[];

    } catch(error: any) {
      console.error(error.message);
    }
  }

  const getCurrentUser = async (): Promise<User | undefined> => {
    const users = await fetchUsers();
    return users?.find((user) => user.username === localStorage.getItem("username"));
  };
  

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopMode(window.innerWidth > 1200);
      dialogRef.current?.close();

      if (isDialogOpen) {
        window.innerWidth > 1200
          ? dialogRef.current?.showModal()
          : dialogRef.current?.show();
      }
    };

    

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dialogRef.current?.close();

    if (isDialogOpen) {
      isDesktopMode ? dialogRef.current?.showModal() : dialogRef.current?.show();
    }
  }, [isDesktopMode, isDialogOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && event.target instanceof Node && !containerRef.current.contains(event.target)) {
        setIsDialogOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(()=> {
    if (selectedFont !== undefined && selectedTheme !== undefined){
      updateUserSettings(selectedFont, selectedTheme)
    }
  }, [selectedFont, selectedTheme]);

  useEffect(() => {
    async function fetchUserSettings() {
      try {
        const currentUser = await getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
          setSelectedTheme(currentUser.theme || "light");
          setSelectedFont(currentUser.fontSize || "medium");
        }
      } catch (error) {
        console.error("Error fetching user settings:", error);
      }
    }
  
    fetchUserSettings();
  }, []);  

  async function updateUserSettings(selectedFont: string, selectedTheme: string) {
    try {
      if (!user) throw new Error("No current user found.");
      
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, theme: selectedTheme, fontSize: selectedFont }),
      });
  
      console.log("Settings updated successfully!");
    } catch (error: any) {
      console.error(error.message);
    }
  }
  

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
        onClick={(event) => {
          event.stopPropagation();
          if (dialogRef.current && event.target instanceof Node && !contentRef.current?.contains(event.target)) {
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
