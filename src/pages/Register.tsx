import React, { useState } from "react";
import { RegisterForm } from "../components";
import { AuthService } from "../services";

export function Register() {
    const [ firstName, setFirstName ] = useState<string>('');
    const [ lastName, setLastName ] = useState<string>('');
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] = useState<string>('');

    const registerService = new AuthService();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(firstName, lastName, email, password);

        registerService.register(firstName, lastName, email, password);
    }


    return (
        <div>
            <RegisterForm 
                firstName={firstName}
                lastName={lastName}
                setFirstName={setFirstName}
                setLastName={setLastName}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}