import React, { useEffect, useState } from 'react'
import { BalanceCard, QuickActions } from '../../components/user/home'
import { WalletService } from '../../services'
import { useAuthContext } from '../../hooks';
export function Home() {
    const { token } = useAuthContext();
    const walletService = new WalletService();
    const [ balance, setBalance ] = useState<number>(0);
    const [ walletExists, setWalletExists] = useState<boolean>(false);

    useEffect(() => {
        console.log(balance)
        setWalletExists(false)
        checkWallet()
    }, [])

    async function checkWallet() {
        walletService.getBalance(token).then((result) => {
            if(result) {
                console.log(result)
                if(result.error) {
                    setWalletExists(false)
                }
                else {
                    setWalletExists(true)
                    console.log("balance ", result.balance)
                    setBalance(result.balance)
                }
            }
        })
    }
    

    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
            {walletExists ? (
                <>
                    <div className='px-4 md:p-0'>
                        <BalanceCard balance={balance} />
                    </div>
                    
                    <div className='px-4 md:p-0'>
                        <QuickActions handleSendMoney={() => {}} handleRequestMoney={() => {}} handleAddFunds={() => {}} />
                    </div>
                </>
            ) : (   
                <>
                </>
            )}
            
        </div>
    )
}