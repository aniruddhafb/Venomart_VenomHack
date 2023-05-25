import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import "@/styles/bootstrap.css";
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar
        theme={"dark"}
      />
      <Component {...pageProps}
        theme={"dark"} />
      <Footer
        theme={"dark"}
      />
    </>
  )
}
