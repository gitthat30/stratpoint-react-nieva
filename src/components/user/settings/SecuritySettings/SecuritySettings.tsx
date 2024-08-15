import React from "react";
import { Shield } from "lucide-react";
import { SettingsType } from "../../../../contexts";

interface SecuritySettingsProps {
    settings: SettingsType;
    handleTwoFactorChange: any;
}

export function SecuritySettings( { settings, handleTwoFactorChange }: SecuritySettingsProps) {
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
                <Shield className="mr-2" size={20} /> Security Settings
            </h3>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Two-Factor Authentication</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <button
                    onClick={handleTwoFactorChange}
                    className={`${
                    settings.twoFactor ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                    <span
                    className={`${
                        settings.twoFactor ? 'translate-x-5' : 'translate-x-0'
                    } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                    />
                </button>
                </dd>
            </div>
            </div>
        </div>
    )
}