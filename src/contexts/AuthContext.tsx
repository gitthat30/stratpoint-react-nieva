import React, { createContext, ReactNode, useState } from 'react';
import { AuthContextType, User } from './types';
import { AuthService } from '../services';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children } : { children : ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(localStorage.getItem('token') !== null); // Use null for loading state
    const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));

    const authService = new AuthService();

    

    async function handleLogin(email : string, password: string) {
        // localStorage.setItem("email", email);
        // setEmail(email);
        // console.log(localStorage.getItem('email'))
        // localStorage.setItem("token", 'true');
        // setIsAuthenticated(true);

        try {
            const response = await authService.login(email, password);
            if(response.token && response.user) {
                localStorage.setItem('token', response.token)
                localStorage.setItem('user', JSON.stringify(response.user))
                setUser(response.user)
                setIsAuthenticated(true);
            }
        }
        catch (error) {
            console.error("Login Failed ", error);
        }
    }

    function handleLogout() {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, handleLogin, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
}