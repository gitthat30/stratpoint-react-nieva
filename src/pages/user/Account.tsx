import React, { useState } from "react";
import { AccountCard, AccountType, LinkedBanksCard, LinkedBanksCardType, PaymentMethodCard, PaymentMethodType } from '../../components/user/accounts'
export function Account() {
    const [accounts] = useState<AccountType[]>([
        { id: 1, name: 'Checking Account', type: 'Checking', balance: 2500 },
        { id: 2, name: 'Savings Account', type: 'Savings', balance: 10000 }
    ]);

    const [linkedBanks] = useState<LinkedBanksCardType[]>([
        { id: 1, name: 'Bank of America', accountNumber: '****1234' },
    ]);

    const [paymentMethods] = useState<PaymentMethodType[]>([
        { id: 1, type: 'Credit Card', last4: '5678', expiryDate: '12/24' },
    ]);

    return (
        <div className="space-y-6">
            <div className="px-6">
                <AccountCard 
                accounts={accounts} 
                handleRemoveAccount={() => {}}
                handleAddAccount={() => {}}/>
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