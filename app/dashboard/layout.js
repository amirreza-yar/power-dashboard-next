"use client";
import { DarkModeProvider, useDarkMode } from "@context/context";
import { AuthProvider } from "@context/AuthContext";
import { MessageProvider } from "@context/MessageContext";
import Message from "@component/Message";

export default function DashboardLayout({ children }) {
  return (
    <DarkModeProvider style={{ backgroundColor: "red" }}>
      <AuthProvider>
        <MessageProvider>
          <Message />
          {children}
        </MessageProvider>
      </AuthProvider>
    </DarkModeProvider>
  );
}
