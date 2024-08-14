import React from 'react'
import { BalanceCard, QuickActions } from '../../components/user/home'
export function Home() {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BalanceCard balance={5000} />
            <QuickActions handleSendMoney={() => {}} handleRequestMoney={() => {}} handleAddFunds={() => {}} />
        </div>
    )
}