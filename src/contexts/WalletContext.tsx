import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { PaymentMethodType, WalletContextType } from './types';
import { WalletService } from '../services';
import { useAuthContext } from '../hooks';

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children } : { children : ReactNode}) {
    const [ walletExists, setWalletExists ] = useState<boolean>(false);
    const [ balance, setBalance ] = useState<number>(0);
    const [ paymentMethods, setPaymentMethods ] = useState<PaymentMethodType[]>([]);
    const { token } = useAuthContext();

    const walletService = new WalletService();

    async function checkWallet() {
        const result = await walletService.getBalance(token);
        if(result) {
            if(result.error) {
                setWalletExists(false)
            }
            else {
                setWalletExists(true)
                setBalance(result.balance)
            }
        }
    }

    async function checkPaymentMethods() {
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
        checkWallet();
        checkPaymentMethods();
    }, [])

    return (
        <WalletContext.Provider value={{ walletExists, balance, checkWallet, paymentMethods, checkPaymentMethods }}>
            {children}
        </WalletContext.Provider>
    )
}

