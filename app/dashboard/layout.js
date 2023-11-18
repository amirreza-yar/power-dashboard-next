"use client";
import { DarkModeProvider, useDarkMode } from "@context/context";

export default function DashboardLayout({ children }) {
  return <DarkModeProvider>{children}</DarkModeProvider>;
}
