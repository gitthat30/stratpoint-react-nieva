import React, { useState } from 'react';
import { LoginForm } from '../components/';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks';




export function Login() {
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const { handleLogin, token } = useAuthContext();

    const navigate = useNavigate();

    async function handleSubmit(email: string, password: string) {
        console.log('Login attempt:', email, password);
        await handleLogin(email, password)
        if(token) {
            navigate('/dashboard/home')
        }

    }
    return (
        <div>
            <LoginForm 
                email={email}
                password={password}
                handleLogin={handleSubmit}
                setEmail={setEmail}
                setPassword={setPassword}
                navigate={useNavigate()}
                />
        </div>
    );
};