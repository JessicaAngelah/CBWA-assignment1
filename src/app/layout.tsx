import "./globals.css";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
