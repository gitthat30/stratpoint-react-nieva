export interface AuthContextType {
    isAuthenticated : boolean;
    email : string | null;
    handleLogin : (email : string) => void;
    handleLogout : () => void;
}