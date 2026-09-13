import type { Metadata } from "next";
import { Montserrat, Open_Sans } from "next/font/google";
import "../globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"]
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  title: "Sacrament Meeting Planner",
  description: "Sacrament Meeting Planner is an application that helps bishoprics and branch leaders efficiently plan for sacrament meetings each week.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className= {`${montserrat.variable} ${openSans.variable} h-full antialiased grow font-sans`}>{children}</main>
  );
}