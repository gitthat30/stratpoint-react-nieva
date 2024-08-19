import React from "react";
import { Link } from "lucide-react";

interface RegisterFormProps {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    setFirstName: (firstName: string) => void;
    setLastName: (lastName: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
export function RegisterForm( { firstName, lastName, email, password, setFirstName, setLastName, setEmail, setPassword, handleSubmit}: RegisterFormProps) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Register for DigiWallet</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">FIrst Name</label>
                    <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                    Register
                </button>
                </form>
                <p className="mt-4 text-center">
                Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
                </p>
            </div>
        </div>
    );
}