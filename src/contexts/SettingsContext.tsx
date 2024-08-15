import React, { createContext, ReactNode, useEffect, useState } from "react";
import { SettingsType, SettingsContextType } from "./types";

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children } : { children : ReactNode}) {
    const [settings, setSettings] = useState<SettingsType>(
        localStorage.getItem("settings") ? JSON.parse(localStorage.getItem("settings")!) : {
            notifications: {
                email: true,
                push: false,
                sms: true
            },
            language: "en",
            twoFactor: false,
            darkMode: false
        }
);

    useEffect(() => {
        localStorage.setItem("settings", JSON.stringify(settings));
    }, [settings]);

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}

