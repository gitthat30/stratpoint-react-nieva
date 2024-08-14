import React, { useState} from 'react';
import { PlusCircle } from 'lucide-react';

interface AccountFormProps {
    handleAddAccount: (e: React.FormEvent<HTMLFormElement>, accountName: string, accountType: string) => void
}

export function AccountForm( { handleAddAccount }: AccountFormProps) {
    const [newAccountName, setNewAccountName] = useState('');
    const [newAccountType, setNewAccountType] = useState('Checking');

    return (
        <form onSubmit={(e : React.FormEvent<HTMLFormElement>) => handleAddAccount(e, newAccountName, newAccountType)} className="flex items-center space-x-2">
            <input
            type="text"
            value={newAccountName}
            onChange={(e) => setNewAccountName(e.target.value)}
            placeholder="Account Name"
            className="flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
            />
            <select
            value={newAccountType}
            onChange={(e) => setNewAccountType(e.target.value)}
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
            >
            <option value="Checking">Checking</option>
            <option value="Savings">Savings</option>
            </select>
            <button type="submit" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <PlusCircle size={18} className="mr-2" />
            Add Account
            </button>
        </form>
    )
}