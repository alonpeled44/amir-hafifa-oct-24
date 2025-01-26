import Header from "../components/Header";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        <div className="background-img" />
        <Component {...pageProps} />
      </main>
    </>
  );
}
