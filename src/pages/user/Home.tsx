import React, { useEffect } from 'react'
import { BalanceCard, QuickActions } from '../../components/user/home'
import { useWalletContext } from '../../hooks/useWalletContext';
import { WalletService } from '../../services';
import { useAuthContext } from '../../hooks';
export function Home() {
    const { balance, walletExists, paymentMethods, checkWallet } = useWalletContext();
    const { token } = useAuthContext();
    const walletService = new WalletService();

    useEffect(() => {
        checkWallet();
    })

    async function handleAddFunds(amount : number, paymentMethodId : string) {
        const result = await walletService.deposit(token, amount, paymentMethodId);

        if(result) {
            console.log(result)
            await checkWallet();
        }
    }

    async function handleSendFunds(amount : number, toUserId : string) {
        const result = await walletService.transfer(token, amount, toUserId);

        if(result) {
            console.log(result)
            await checkWallet();

            return result
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {walletExists ? (
                <>
                    <div className='px-4 md:p-0'>
                        <BalanceCard balance={balance} />
                    </div>
                    
                    {paymentMethods.length > 0 ? (
                        <div className='px-4 md:p-0'>
                            <QuickActions 
                                handleSendMoney={handleSendFunds} 
                                handleAddFunds={handleAddFunds} />
                        </div>
                    ) : (
                        <></>
                    )}
                    
                </>
            ) : (   
                <>
                </>
            )}
            
        </div>
    )
}