import React, { createContext, ReactNode, useState } from 'react';
import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children } : { children : ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(localStorage.getItem('token') === 'true'); // Use null for loading state
    const [email, setEmail] = useState<string | null>(localStorage.getItem('email'));
    console.log(localStorage.getItem('token'))
    function handleLogin(email : string) {
        localStorage.setItem("email", email);
        setEmail(email);
        console.log(localStorage.getItem('email'))
        localStorage.setItem("token", 'true');
        setIsAuthenticated(true);
    }

    function handleLogout() {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setEmail('');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, email, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}