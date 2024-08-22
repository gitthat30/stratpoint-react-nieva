import React, { useEffect, useState } from "react";
import { LinkedBanksCard, LinkedBanksCardType, PaymentMethodCard, PaymentMethodType, WalletCard } from '../../components/user/accounts'
import { WalletService } from "../../services";
import { useAuthContext } from "../../hooks";

export function Account() {
    // const [accounts] = useState<AccountType[]>([
    //     { id: 1, name: 'Checking Account', type: 'Checking', balance: 2500 },
    //     { id: 2, name: 'Savings Account', type: 'Savings', balance: 10000 }
    // ]);

    const { token } = useAuthContext();

    const walletService = new WalletService();

    const [walletExists, setWalletExists] = useState<boolean>(false);

    const [linkedBanks] = useState<LinkedBanksCardType[]>([
        { id: 1, name: 'Bank of America', accountNumber: '****1234' },
    ]);

    const [paymentMethods] = useState<PaymentMethodType[]>([
        { id: 1, type: 'Credit Card', last4: '5678', expiryDate: '12/24' },
    ]);

    async function checkWallet() {
        walletService.getBalance(token).then((result) => {
            if(result) {
                console.log(result)
                if(result.error) {
                    setWalletExists(false)
                }
                else {
                    setWalletExists(true)
                }
            }
        })
    }

    async function createWallet() {
        walletService.createWallet(token).then((result) => {
            if(result) {
                console.log(result)
                if(!result.error) {
                    console.log("Here")
                    setWalletExists(true)
                }
            }
        })
    }
    
    useEffect(() => {
        checkWallet()
    }, [])

    return (
        <div className="space-y-6">
            <div className="px-6">
                <WalletCard
                    balance={0}
                    walletExists={walletExists}
                    handleCreateWallet={createWallet}
                />
            </div>

            <div className="px-6">
                <LinkedBanksCard 
                linkedBanks={linkedBanks}
                handleRemoveBank={() => {} }
                handleLinkBank={() => {}}/>
            </div>

            <div className="px-6">
                <PaymentMethodCard 
                paymentMethods={paymentMethods}
                handleRemovePaymentMethod={() => {} }
                handleAddPaymentMethod={() => {}}/>
            </div>

            
        </div>
    )
}