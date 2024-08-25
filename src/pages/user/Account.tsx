import React, { useEffect, useState } from "react";
import { PaymentMethodCard, PaymentMethodType, WalletCard } from '../../components/user/accounts'
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

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodType[]>([
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

    async function addPaymentMethod(paymentMethodId : string) {
        walletService.addPaymentMethod(token, paymentMethodId).then((result) => {
            if(result) {    
                console.log(result)
            }
        })

        listPaymentMethods()
    }

    async function listPaymentMethods() {
        walletService.listPaymentMethods(token).then((result) => {
            if(result) {
                const mapped : PaymentMethodType[] = result.map((method : any) => {
                    return {
                        id: method.id,
                        type: method.type,
                        last4: method.card.last4,
                        expiryDate: `${method.card.expMonth}/${method.card.expYear.toString().slice(-2)}`
                    }
                })
                setPaymentMethods(mapped)
            }
        })
    }
    
    useEffect(() => {
        checkWallet()
        listPaymentMethods()
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
                <PaymentMethodCard 
                paymentMethods={paymentMethods}
                handleRemovePaymentMethod={() => {} }
                handleAddPaymentMethod={addPaymentMethod}/>
            </div>

            
        </div>
    )
}