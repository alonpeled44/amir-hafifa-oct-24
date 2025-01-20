import css from "../styles/login.module.css";

export default function Login() {
  return (
    <>
      <form className={css.container}>
        <h1>Login</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <p></p>
        <div>
          <button type="submit">Login</button>
          <button type="submit">Join as Guest</button>
        </div>
      </form>
    </>
  );
}
