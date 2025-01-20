import Backgroud from "../images/pokemon-backgroud.jpg";
import PhoneBackground from "../images/background-image-phone.png";
import Header from "../components/Header";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {

  return (
    <>
      <Header />
      <main>
        <div className="img"/>
        <Component {...pageProps} />
      </main>
    </>
  );
}
