import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/providers/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chat widget admin Panel",
  description: "Admin panel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          toastOptions={{
            style: {
              fontFamily: "'Rubik', sans-serif",
              fontWeight: "bold",
              fontSize: "16px",
            },
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
