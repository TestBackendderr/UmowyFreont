import "../styles/globals.scss";
import "../styles/Navbar.scss";
import "../styles/Login.scss";
import "../styles/Leftside.scss";
import "../styles/Middleside.scss";
import "../styles/Rightside.scss";
import "../styles/Nadzisiaj.scss";
import "../styles/Home.scss";
import "../styles/UtworzUmowe.scss";
import "../styles/ListaUmow.scss";
import { AuthProvider } from "../context/AuthContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
