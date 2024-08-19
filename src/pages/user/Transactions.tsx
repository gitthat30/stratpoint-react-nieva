import React, { useState } from "react";
import { SearchBar, TransactionCard, Transaction } from "../../components/user/transactions";


export function Transactions() {
    const [ transactions ] = useState<Transaction[]>([
        { id: 1, date: '2022-01-01', description: 'Groceries', amount: 100 },
        { id: 2, date: '2022-01-02', description: 'Dinner with Family', amount: -50 },
        { id: 3, date: '2022-01-03', description: 'Coffee', amount: -10 }
    ]);
    const [ searchTerm, setSearchTerm ] = useState<string>('');

    const filteredTransactions = transactions.filter((transaction) => {
        return transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="space-y-6">
            <div className="px-3">
                <SearchBar 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}/>
            </div>
            
            <div className="px-3">
                <TransactionCard transactions={filteredTransactions}/>
            </div>
        </div>
    )
}