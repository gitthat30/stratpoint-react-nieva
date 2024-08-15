import React, { createContext, ReactNode, useState } from "react";
import { SettingsType, SettingsContextType } from "./types";

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children } : { children : ReactNode}) {
    const [settings, setSettings] = useState<SettingsType>({
        notifications: {
            email: true,
            push: false,
            sms: true
        },
        language: "en",
        twoFactor: false,
        darkMode: false
    });

    return (
        <SettingsContext.Provider value={{ settings, setSettings }}>
            {children}
        </SettingsContext.Provider>
    )
}

