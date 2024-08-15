import React, { useState } from "react";
import { DarkModeSettings, LanguageSettings, NotificationSettings, SecuritySettings } from "../../components/user/settings";
import { useSettingsContext } from "../../hooks";
import { SettingsType } from "../../contexts";

export function Settings() {
    const { settings, setSettings } = useSettingsContext();

    const [newSettings, setNewSettings] = useState<SettingsType>(settings);

    function handleNotificationChange(key : keyof SettingsType['notifications']) {
        setNewSettings({
            ...newSettings,
            notifications: {
                ...newSettings.notifications,
                [key]: !newSettings.notifications[key]
            }
        })
    }

    const handleLanguageChange = (e : React.ChangeEvent<HTMLSelectElement>) => {
        setNewSettings({
            ...newSettings,
            language: e.target.value
        })
    };

    function handleTwoFactorChange() {
        setNewSettings({
            ...newSettings,
            twoFactor: !newSettings.twoFactor
        })
    }

    function handleDarkModeChange() {
        setNewSettings({
            ...newSettings,
            darkMode: !newSettings.darkMode
        })
    }

    function saveSettings() {
        setSettings(newSettings);
        alert('Settings saved!');
    }
    
    return (
        <div className="space-y-6">
            <NotificationSettings 
                settings={newSettings}
                handleNotificationChange={handleNotificationChange}
            />

            <LanguageSettings 
                settings={newSettings}
                handleLanguageChange={handleLanguageChange}
            />

            <SecuritySettings
                settings={newSettings}
                handleTwoFactorChange={handleTwoFactorChange}
            />

            <DarkModeSettings
                settings={newSettings}
                handleDarkModeChange={handleDarkModeChange}
            />

            <div className="mt-6">
                <button
                onClick={saveSettings}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                Save Settings
                </button>
            </div>
        </div>
    )
}
