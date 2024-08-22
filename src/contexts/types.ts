export interface AuthContextType {
    isAuthenticated : boolean;
    token : string | null;
    user : User | null;
    handleLogin : (email : string, password : string) => void;
    handleLogout : () => void;
}

export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
}

export enum Tab {
    HOME = "home",
    ACCOUNTS = "accounts",
    TRANSACTIONS = "transactions",
    STORE_PURCHASE = "store-purchase",
    NOTIFICATIONS = "notifications",
    PROFILE = "profile",
    SETTINGS = "settings"
}

export interface TabContextType {
    activeTab : Tab;
    setActiveTab : (tab : Tab) => void;
}

export type SettingsType = {
    notifications: {
        email: boolean,
        push: boolean,
        sms: boolean
    };
    language: string;
    twoFactor: boolean;
    darkMode: boolean;
};

export interface SettingsContextType {
    settings: SettingsType,
    setSettings : (settings: SettingsType) => void
}