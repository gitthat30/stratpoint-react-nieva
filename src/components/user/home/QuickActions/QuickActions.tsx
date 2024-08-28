import React, { useState } from 'react';
import { ArrowUpRight, Wallet } from 'lucide-react';
import { TransactionModalCard } from '../TransactionModalCard/TransactionModalCard';
import { useWalletContext } from '../../../../hooks';

    interface QuickActionsProps {
        handleSendMoney : (amount : number, toUserId : string) => Promise<any>;
        handleAddFunds : (amount : number, paymentMethodId : string) => void;
    }

    export function QuickActions( { handleSendMoney, handleAddFunds } : QuickActionsProps) {
        const [showModal, setShowModal] = useState<boolean>(false);
        const [currentTransactionType, setCurrentTransactionType] = useState<string>("");

        const { paymentMethods, balance } = useWalletContext();


        const openModal = (transactionType: string) => {
            setCurrentTransactionType(transactionType);
            setShowModal(true);
        };

        async function handleTransaction(amount: number, transactionDetails: { paymentMethod? : string, toUserId? : string }, transactionType: string) {
            if(transactionDetails.paymentMethod == "" && transactionDetails.toUserId == "") {
                alert("Please fill out all fields.");
            } else if (transactionType === "Send Money") {
                if(amount < balance) {
                    const result = await handleSendMoney(amount, transactionDetails.toUserId!);
                    if(result.error) {
                        alert(`Error: ${result.message}`);
                    }
                    else 
                        alert(`$${amount} sent successfully to ${transactionDetails.toUserId!}!`);
                }
                else {
                    alert("Insufficient funds.");
                    setShowModal(false)
                }
                
            } else if (transactionType === "Add Funds") {
                handleAddFunds(amount, transactionDetails.paymentMethod!);  // Implement specific logic if needed
                alert(`$${amount} added successfully using ${transactionDetails.paymentMethod!}!`);
            } else {
                alert("Invalid transaction type.");
            }
        };

        return (
            <div className="bg-card-background overflow-hidden shadow rounded-lg max-w-sm:flex md:max-w-md:flex">
                <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-header-text mb-4">Quick Actions</h3>
                <div className="space-y-2">
                    <button onClick={() => openModal("Send Money")} className="w-full bg-button text-button-text py-2 px-4 rounded hover:bg-button-hover transition duration-200 flex items-center justify-center">
                        <ArrowUpRight className="mr-2" size={18} />
                        Send Money
                    </button>
                    <button onClick={() => openModal("Add Funds")} className="w-full bg-button text-button-text py-2 px-4 rounded hover:bg-button-hover transition duration-200 flex items-center justify-center">
                        <Wallet className="mr-2" size={18} />
                        Add Funds
                    </button>
                </div>
                </div>
                <TransactionModalCard
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleTransaction}
                    transactionType={currentTransactionType}
                    paymentMethods={paymentMethods} />
            </div>
        )
    }