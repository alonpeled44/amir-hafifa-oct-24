import css from "../styles/login.module.css";

export default function Login() {
  return (
    <>
      <div className={css.container}>
        <h1>Login</h1>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <p></p>
        <div>
          <button>Login</button>
          <button>Join as Guest</button>
        </div>
      </div>
    </>
  );
}
