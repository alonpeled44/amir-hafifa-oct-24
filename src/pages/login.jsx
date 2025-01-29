import { useState, useEffect } from "react";
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
    const newValue = e.target.value;

    if (newValue.length > password.length) {
      const newChar = newValue[newValue.length - 1];
      if (/^[a-zA-Z0-9]$/.test(newChar)) {
        setPassword(password + newChar);
      }
    } else if (newValue.length < password.length) {
      setPassword(password.slice(0, newValue.length));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username or Password incorrect!");
    } else {
      setError("");

      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      console.log("Saved Username:", username);
      console.log("Saved Password:", password);

      setUsername("");
      setPassword("");
    }
  };

  const handleGuestLogin = () => {
    localStorage.setItem("username", "!Guest!");
    localStorage.setItem("password", "!Guest!");

    setUsername("");
    setPassword("");

    console.log("Guest Login: Saved as '!Guest!' but inputs remain empty.");
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
        type="text"
        placeholder="Password"
        value={"*".repeat(password.length)}
        onChange={handlePasswordChange}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <button type="submit">Login</button>
        <button type="button" onClick={handleGuestLogin}>
          Join as Guest
        </button>
      </div>
    </form>
  );
}
