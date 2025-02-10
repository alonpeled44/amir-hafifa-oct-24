import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import css from "../styles/user-menu.module.css";

export default function UserMenu({ setIsLoggedIn }) {
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
            router.push("/login");
            window.dispatchEvent(new Event("storage"));
          }}
        >
          Logout
        </button>
      </div>
    )
  );
}
