import React from 'react';

interface BalanceCardProps {
    balance: number;
}

export function BalanceCard( { balance }: BalanceCardProps) {
    return (
        <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Total Balance</h3>
            <p className="text-3xl font-bold">${balance.toFixed(2)}</p>
            </div>
        </div>
    )
}