import HomePage from "@/features/home/HomePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: true,
  },
};

export default function Home() {
  return <HomePage />;
}
