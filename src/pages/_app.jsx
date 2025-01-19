import image from "../images/pokemon-backgroud.jpg";
import Header from "../components/Header";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Header />
      <main>
        <img src={image.src} alt="background" />
        <Component {...pageProps} />
      </main>
    </>
  );
}
