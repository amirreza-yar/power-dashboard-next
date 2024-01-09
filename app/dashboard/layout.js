"use client";
import { DarkModeProvider, useDarkMode } from "@context/context";
import { AuthProvider } from "@context/AuthContext";

export default function DashboardLayout({ children }) {
  return (
    <DarkModeProvider style={{backgroundColor: "red"}}>
      <AuthProvider>{children}</AuthProvider>
    </DarkModeProvider>
  );
}
