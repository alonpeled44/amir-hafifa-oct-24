import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import css from "../styles/user-menu.module.css";

export default function UserMenu({
  setIsLoggedIn,
  setSelectedTheme,
  setSelectedFont,
}) {
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUsername = localStorage.getItem("username");
      setUsername(savedUsername);
    }
  }, [router, setIsLoggedIn]);

  return (
    router.pathname !== "/login" && (
      <div className={css["user-menu"]}>
        <p>Welcome {username === "!Guest!" ? "Guest" : username}!</p>
        <button
          onClick={() => {
            localStorage.removeItem("username");
            localStorage.removeItem("password");
            setUsername(null);
            setIsLoggedIn(false);

            localStorage.setItem("theme", "light");
            document.documentElement.setAttribute("data-theme", "light");

            localStorage.setItem("font-size", "medium");
            document.documentElement.setAttribute("data-font-size", "medium");

            router.push("/login");
          }}
        >
          Logout
        </button>
      </div>
    )
  );
}
