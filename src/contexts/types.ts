export interface AuthContextType {
    isAuthenticated : boolean;
    email : string | null;
    handleLogin : (email : string) => void;
    handleLogout : () => void;
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