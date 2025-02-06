import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import css from "../styles/user-menu.module.css";

export default function UserMenu() {
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (!savedUsername) {
      router.push("/login");
    } else {
      setUsername(savedUsername);
    }
  }, []);

  if (router.pathname === "/login") {
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    router.push("/login");
  };

  return (
    username && (
      <div className={css["user-menu"]} data-user="user-menu">
        <span>Welcome {username}!</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    )
  );
}
