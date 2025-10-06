import "./globals.css";
import Header from "./components/Header";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import TabsTab from "./components/tabs/TabsTab";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-content">
          <Header />
          <Navbar />
            <TabsTab />
        </div>
        <Footer />
      </body>
    </html>
  );
}
