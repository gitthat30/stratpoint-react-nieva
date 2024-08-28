import React, { useEffect, useState } from "react";
import { SearchBar, TransactionCard } from "../../components/user/transactions";
import { WalletService } from "../../services";
import { useAuthContext } from "../../hooks";
import { Transaction } from "../../services";


export function Transactions() {
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ transactions, setTransactions ] = useState<Transaction[]>([]);

    const filteredTransactions = transactions.filter((transaction) => {
        return transaction.type.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const walletService = new WalletService();

    const { token } = useAuthContext();

    async function checkTransactions() {
        const result = await walletService.listTransactions(token);
        setTransactions(result)
        console.log(result)
    }

    useEffect(() => {
        checkTransactions();
    }, [])

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