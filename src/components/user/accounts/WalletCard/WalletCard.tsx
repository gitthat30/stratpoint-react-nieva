import { Wallet } from 'lucide-react';
import React from 'react';

interface WalletCardProps {
    walletExists: boolean;
    balance: number;
    handleCreateWallet: () => void;
}

export function WalletCard({ walletExists, balance, handleCreateWallet }: WalletCardProps) {
    return (
        <div className="bg-card-background shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-card-header flex items-center">
                    Wallet Balance
                </h3>
            </div>
            {
                walletExists ? (
                    <div className="border-t border-border">
                        <div className="px-4 py-5 sm:px-6">
                            <p className="text-3xl font-semibold text-currency-text">
                                ${balance.toFixed(2)}
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="border-t border-border">
                        <div className="px-4 py-5 sm:px-6">
                            <button onClick={handleCreateWallet} className="inline-flex justify-center col-span-2 items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-button-text bg-button hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <Wallet size={18} className="mr-2" />
                                Create Wallet
                            </button>
                        </div>
                    </div>
                )
            }
            
        </div>
    );
}
