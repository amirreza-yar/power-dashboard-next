import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext();

export function useDarkMode() {
    return useContext(DarkModeContext);
}

export function DarkModeProvider({ children }) {
    const [DarkMode, setDarkMode] = useState(true);

    return (
        <DarkModeContext.Provider value={{ DarkMode, setDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}
