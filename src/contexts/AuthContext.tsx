import React, { createContext, ReactNode, useContext, useState } from 'react';
import { AuthContextType } from './types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Or a spinner component
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, email, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');   
    }

    return context;
}
