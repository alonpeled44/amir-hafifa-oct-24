import Header from "../components/Header";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        <div className="img-container">
          <div className="background-img" />
        </div>
        <Component {...pageProps} />
      </main>
    </>
  );
}
