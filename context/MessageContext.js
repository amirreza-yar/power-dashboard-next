import { createContext, useContext, useEffect, useState } from "react";

const MessageContext = createContext();

export function useMessage() {
  return useContext(MessageContext);
}

export function MessageProvider({ children }) {
  const [message, setMessage] = useState("");

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
}