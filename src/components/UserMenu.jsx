import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import css from "../styles/user-menu.module.css";

export default function UserMenu() {
  const [username, setUsername] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    console.log(savedUsername);
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, [router]);

  if (router.pathname === "/login") {
    return null;
  }

  return (
    username && (
      <div className={css["user-menu"]} data-user="user-menu">
        <span>Welcome {username}!</span>
        <button>Logout</button>
      </div>
    )
  );
}
