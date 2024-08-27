import React, { useEffect } from "react";
import { PaymentMethodCard, WalletCard } from '../../components/user/accounts'
import { WalletService } from "../../services";
import { useAuthContext, useKYCContext } from "../../hooks";
import { useWalletContext } from "../../hooks/useWalletContext";

export function Account() {
    // const [accounts] = useState<AccountType[]>([
    //     { id: 1, name: 'Checking Account', type: 'Checking', balance: 2500 },
    //     { id: 2, name: 'Savings Account', type: 'Savings', balance: 10000 }
    // ]);

    const { token } = useAuthContext();

    const walletService = new WalletService();

    const { walletExists, checkWallet, paymentMethods, checkPaymentMethods } = useWalletContext();
    const { kycApproved, checkKYCStatus } = useKYCContext();

    useEffect(() => {
        checkWallet();
        checkKYCStatus();
    })

    async function createWallet() {
        const result = await walletService.createWallet(token);

        if(result) {
            console.log(result)
            if(!result.error) {
                console.log("Wallet created successfully")
                await checkWallet()
            }
        }
    }

    async function addPaymentMethod(paymentMethodId : string) {
        const result = await walletService.addPaymentMethod(token, paymentMethodId);
        if(result) {
            console.log(result)
            await checkPaymentMethods()
        }
    }
    
    return (
        <div className="space-y-6">
            {kycApproved ? (
                <div className="px-6">
                    <WalletCard
                        balance={0}
                        walletExists={walletExists}
                        handleCreateWallet={createWallet}
                    />
                </div>
            ) : (
                <div className="px-6">
                    <div className="bg-card-background shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-card-header">Your Wallet</h3>
                        </div>
                        <div className="w-max:flex border-t border-border">
                            <p className="px-6 py-3 text-green-50">You cannot make a wallet yet. Please get your KYC approved.</p>
                        </div>
                    </div>
                </div>
            )}
            

            {kycApproved ? (
                walletExists ? (
                    <div className="px-6">
                        <PaymentMethodCard 
                        paymentMethods={paymentMethods}
                        handleRemovePaymentMethod={() => {} }
                        handleAddPaymentMethod={addPaymentMethod}/>
                    </div>
                ) : (
                    <div className="px-6 gaps">
                        <div className="bg-card-background shadow overflow-hidden sm:rounded-lg">
                            <div className="px-4 py-5 sm:px-6">
                                <h3 className="text-lg leading-6 font-medium text-card-header">Payment Methods</h3>
                            </div>
                            <div className="w-max:flex border-t border-border">
                                
                                <p className="px-6 py-3 text-green-50">You cannot add a payment method yet. Please create a wallet.</p>
                            </div>                   
                        </div>
                    </div>
                )
            ) : (
                <div className="px-6 gaps">
                    <div className="bg-card-background shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-card-header">Payment Methods</h3>
                        </div>
                        <div className="w-max:flex border-t border-border">
                            
                            <p className="px-6 py-3 text-green-50">You cannot add a payment method yet. Please get your KYC approved.</p>
                        </div>                   
                    </div>
                </div>
            )}
            

            
        </div>
    )
}