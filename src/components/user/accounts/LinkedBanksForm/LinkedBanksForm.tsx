import React, { useState } from "react";
import { Building } from "lucide-react";

interface LinkedBanksFormProps {
    handleLinkBank: (e: React.FormEvent<HTMLFormElement>, bankName: string, bankAccountNumber: string) => void
}

export function LinkedBanksForm( { handleLinkBank }: LinkedBanksFormProps) {
    const [newBankName, setNewBankName] = useState('');
    const [newBankAccountNumber, setNewBankAccountNumber] = useState('');

    return (
        <form onSubmit={(e) => {handleLinkBank(e, newBankName, newBankAccountNumber)}} className="flex items-center space-x-2">
            <input
              type="text"
              value={newBankName}
              onChange={(e) => setNewBankName(e.target.value)}
              placeholder="Bank Name"
              className="flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={newBankAccountNumber}
              onChange={(e) => setNewBankAccountNumber(e.target.value)}
              placeholder="Account Number"
              className="flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
            />
            <button type="submit" className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <Building size={18} className="mr-2" />
              Link Bank
            </button>
          </form>
    )
}