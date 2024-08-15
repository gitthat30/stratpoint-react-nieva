import React from 'react';
import { Trash2 } from 'lucide-react';
import { LinkedBanksForm } from '../LinkedBanksForm/LinkedBanksForm';

export type LinkedBanksCardType = {
    id: number
    name: string
    accountNumber: string
}

interface LinkedBanksCardProps {
    linkedBanks: LinkedBanksCardType[],
    handleRemoveBank: (id: number) => void,
    handleLinkBank: (e: React.FormEvent, bankName: string, bankAccountNumber: string) => void
}

export function LinkedBanksCard( { linkedBanks, handleRemoveBank, handleLinkBank }: LinkedBanksCardProps) {
    return (
        <div className="bg-card-background shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-header-text">Linked Bank Accounts</h3>
            </div>
            <div className="border-t border-border">
                <ul className="divide-y divide-border">
                    {linkedBanks.map(bank => (
                    <li key={bank.id} className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-card-text truncate">{bank.name}</p>
                            <p className="text-sm text-card-text-small">Account: {bank.accountNumber}</p>
                        </div>
                        <button onClick={() => handleRemoveBank(bank.id)} className="text-red-600 hover:text-red-900">
                            <Trash2 size={18} />
                        </button>
                        </div>
                    </li>
                    ))}
                </ul>
            </div>

            <div className="px-4 py-4 sm:px-6">
                <LinkedBanksForm handleLinkBank={handleLinkBank}/>
            </div>
        </div>
    )
}