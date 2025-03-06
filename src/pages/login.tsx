import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/router";
import users from "../libs/users";
import css from "../styles/login.module.css";
import { Nullable } from "../libs/types";

export default function Login() {
  const [showTitle, setShowTitle] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setShowTitle(window.innerWidth > 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (((event.nativeEvent as SubmitEvent).submitter as Nullable<HTMLButtonElement>)?.id === "guest") {
      localStorage.setItem("username", "!Guest!");
      localStorage.setItem("password", "!Guest!");
      setUsername("");
      setPassword("");
      router.push("/");
    } else {
      if (!username || !password) {
        setError("Both fields are required!");
      } else {
        const foundUser = users.find(
          (user) => user.username === username && user.password === password
        );

        if (foundUser) {
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          router.push("/");
        } else {
          setError("Username or password incorrect");
        }
      }
    }
  };

  return (
    <form className={css["form-container"]} onSubmit={handleSubmit}>
      {showTitle && <h1>Login</h1>}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) => {
          const value = event.target.value;
          if (/^[a-zA-Z0-9]*$/.test(value)) {
            setUsername(value);
          }
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => {
          const value = event.target.value;
          if (/^[a-zA-Z0-9]*$/.test(value)) {
            setPassword(value);
          }
        }}
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
