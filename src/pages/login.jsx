import { useState, useEffect } from "react";
import css from "../styles/login.module.css";

export default function Login() {
  const [showTitle, setShowTitle] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowTitle(window.innerWidth > 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <form className={css.container}>
      {showTitle && <h1>Login</h1>}
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <div>
        <button type="submit">Login</button>
        <button type="submit">Join as Guest</button>
      </div>
    </form>
  );
}
