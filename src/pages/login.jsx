import { useState, useEffect } from "react";
import css from "../styles/login.module.css";

export default function Login() {
  const [showTitle, setShowTitle] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setShowTitle(window.innerWidth > 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setUsername(value);
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (e.nativeEvent.submitter.id === "guest") {
      localStorage.setItem("username", "!Guest!");
      localStorage.setItem("password", "!Guest!");

      setUsername("");
      setPassword("");
    } else {
      if (!username || !password) {
        setError("Both fields are required!");
      } else {
        setError("");

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        setUsername("");
        setPassword("");
      }
    }
  };

  return (
    <form className={css.container} onSubmit={handleSubmit}>
      {showTitle && <h1>Login</h1>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={handlePasswordChange}
      />
      {error && <p>{error}</p>}
      <div>
        <button type="submit" id="login">
          Login
        </button>
        <button type="submit" id="guest">
          Join as Guest
        </button>
      </div>
    </form>
  );
}
