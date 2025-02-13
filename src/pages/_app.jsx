import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username && router.pathname !== "/login") {
      router.push("/login");
    }
    if (username && router.pathname === "/login") {
      router.push("/");
    }
  }, [router.pathname]);

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
