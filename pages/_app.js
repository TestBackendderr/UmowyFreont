import Head from "next/head";
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
import "../styles/UmowaWiecej.scss";
import "../styles/ListaZadan.scss"; // Новый импорт
import "../styles/ZadanieDetail.scss"; // Новый импорт
import { AuthProvider } from "../context/AuthContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <html lang="pl" translate="no" />
        <title>CRM Sun Fee</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <meta name="description" content="CRM Sun Fee" />
        <meta httpEquiv="Content-Language" content="pl" />
        <meta name="google" content="notranslate" />
        <link
          rel="icon"
          href="https://sunfee.pl/wp-content/uploads/2024/09/cropped-XMLID_00000036931643181835786380000009205863717219345586_-32x32.png"
        />
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}