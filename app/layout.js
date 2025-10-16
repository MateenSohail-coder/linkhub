import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NetworkStatus from "./components/NetworkStatus";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Linkhub -- only one link in bio",
  description: "Linkthub-- only one link in bio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NetworkStatus />
        <main>{children}</main>
      </body>
    </html>
  );
}
