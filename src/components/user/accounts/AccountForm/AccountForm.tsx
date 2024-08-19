import React, { useState} from 'react';
import { PlusCircle } from 'lucide-react';

interface AccountFormProps {
    handleAddAccount: (e: React.FormEvent<HTMLFormElement>, accountName: string, accountType: string) => void
}

export function AccountForm( { handleAddAccount }: AccountFormProps) {
    const [newAccountName, setNewAccountName] = useState('');
    const [newAccountType, setNewAccountType] = useState('Checking');

    return (
        <form onSubmit={(e : React.FormEvent<HTMLFormElement>) => handleAddAccount(e, newAccountName, newAccountType)} className="grid grid-cols-2 sm:grid-cols-3 justify-center gap-3 sm:flex sm:flex-wrap items-center">
            <input
            type="text"
            value={newAccountName}
            onChange={(e) => setNewAccountName(e.target.value)}
            placeholder="Account Name"
            className="flex-grow shadow-sm border px-2 text-card-text focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-border placeholder-account-text bg-background rounded-md"
            />

            <select
            value={newAccountType}
            onChange={(e) => setNewAccountType(e.target.value)}
            className="flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md bg-background text-card-text-small border border-border"
            >
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
            </select>
            <button type="submit" className="inline-flex col-span-2 items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-button-text bg-button hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <PlusCircle size={18} className="mr-2" />
            Add Account
            </button>
        </form>
    )
}