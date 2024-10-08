import React from "react";

export type Transaction = {
    id: number;
    date: string;
    description: string;
    amount: number;
};

export interface TransactionCardProps {
    transactions: Transaction[];
}

export function TransactionCard( { transactions }: TransactionCardProps ) {
    return (
        <div className="bg-card-background shadow overflow-hidden sm:rounded-lg">
            <table className="min-w-full divide-y divide-border">
                <thead className="bg-card-background">
                    <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-card-text uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-card-text uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-card-text uppercase tracking-wider">Amount</th>
                    </tr>
                </thead>
            <tbody className="bg-card-background divide-y divide-border">
                {transactions.map((transaction) => (
                <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-card-header">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-card-header">{transaction.description}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}