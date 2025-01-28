import { useState } from "react";
import css from "../styles/login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z0-9]*$/.test(value)) {
      setUsername(value);
    }
  };

  const handlePasswordChange = (e) => {
    const newValue = e.target.value;

    // Compare newValue with current masked password length
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
      setError("Both fields are required!");
      return;
    }
    setError("");
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <form className={css.container} onSubmit={handleSubmit}>
      <h1>Login</h1>
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
        <button type="button" onClick={() => console.log("Guest Login")}>
          Join as Guest
        </button>
      </div>
    </form>
  );
}
