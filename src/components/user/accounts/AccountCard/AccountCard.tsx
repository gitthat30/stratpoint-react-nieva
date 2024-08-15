import React  from 'react';
import { Trash2 } from 'lucide-react';
import { AccountForm } from '../AccountForm/AccountForm';

export type AccountType = {
    id: number
    name: string
    type: string
    balance: number
}

interface AccountCardProps {
    accounts: AccountType[],
    handleRemoveAccount: (id: number) => void
    handleAddAccount: (e : React.FormEvent, accountName : string, accountType : string) => void
} 

export function AccountCard( { accounts, handleRemoveAccount, handleAddAccount }: AccountCardProps) {
    return (
        <div className="bg-card-background shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-card-header">Your Accounts</h3>
            </div>
            <div className="border-t border-border">
                <ul className="divide-y divide-border">
                    {accounts.map(account => (
                    <li key={account.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-card-text truncate">{account.name}</p>
                            <p className="text-sm text-card-text-small">{account.type}</p>
                        </div>
                        <div className="flex items-center">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-currency-background text-currency-text">
                            ${account.balance.toFixed(2)}
                            </p>
                            <button onClick={() => handleRemoveAccount(account.id)} className="ml-2 text-red-600 hover:text-red-900">
                            <Trash2 size={18} />
                            </button>
                        </div>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>
            <div className="px-4 py-4 sm:px-6">
                <AccountForm handleAddAccount={ handleAddAccount }/>
            </div>
      </div>
    )
}