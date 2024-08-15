import { Globe } from "lucide-react";
import React from "react";
import { SettingsType } from "../../../../contexts/types";

interface LanguageSettingsProps {
    settings: SettingsType;
    handleLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function LanguageSettings( { settings, handleLanguageChange }: LanguageSettingsProps) {
    return (
        <div className="bg-card-background shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-header-text flex items-center">
                <Globe className="mr-2" size={20} /> Language Settings
            </h3>
            </div>
            <div className="border-t border-border px-4 py-5 sm:p-0">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-card-text-small">Language</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <select
                    value={settings.language}
                    onChange={handleLanguageChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border bg-background text-header-text border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                </select>
                </dd>
            </div>
            </div>
        </div>
    )
}