import React from 'react'
import { BalanceCard, QuickActions } from '../../components/user/home'
import { useWalletContext } from '../../hooks/useWalletContext';
export function Home() {
        const { balance, walletExists } = useWalletContext();
        const { paymentMethods } = useWalletContext();

        console.log(walletExists)
    
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {walletExists ? (
                <>
                    <div className='px-4 md:p-0'>
                        <BalanceCard balance={balance} />
                    </div>
                    
                    {paymentMethods.length > 0 ? (
                        <div className='px-4 md:p-0'>
                            <QuickActions 
                                handleSendMoney={() => {}} 
                                handleRequestMoney={() => {}} 
                                handleAddFunds={() => {}} />
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