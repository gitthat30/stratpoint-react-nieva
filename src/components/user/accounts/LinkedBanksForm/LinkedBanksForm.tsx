import React, { useState } from "react";
import { Building } from "lucide-react";

interface LinkedBanksFormProps {
    handleLinkBank: (e: React.FormEvent<HTMLFormElement>, bankName: string, bankAccountNumber: string) => void
}

export function LinkedBanksForm( { handleLinkBank }: LinkedBanksFormProps) {
    const [newBankName, setNewBankName] = useState('');
    const [newBankAccountNumber, setNewBankAccountNumber] = useState('');

    return (
        <form onSubmit={(e) => {handleLinkBank(e, newBankName, newBankAccountNumber)}} className="grid grid-cols-2 gap-3 sm:flex items-center">
            <input
              type="text"
              value={newBankName}
              onChange={(e) => setNewBankName(e.target.value)}
              placeholder="Bank Name"
              className="flex-grow shadow-sm border px-2 text-card-text focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-border bg-background rounded-md"
            />
            <input
              type="text"
              value={newBankAccountNumber}
              onChange={(e) => setNewBankAccountNumber(e.target.value)}
              placeholder="Account Number"
              className="flex-grow shadow-sm border px-2 text-card-text bg-background focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
            />
            <button type="submit" className="inline-flex justify-center col-span-2 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-button-text bg-button hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Building size={18} className="mr-2" />
              Link Bank
            </button>
          </form>
    )
}