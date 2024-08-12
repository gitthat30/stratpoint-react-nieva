import React from 'react';
import { Home, CreditCard, DollarSign, Bell, User, Settings, LogOut, ShoppingBag } from 'lucide-react';
import { useTabContext } from '../../../hooks/useTabContext';
import { Tab } from '../../../contexts/types';
import { useAuthContext } from '../../../hooks';

const sidebarLinks = [
    { icon: <Home />, label: 'Home', key: Tab.HOME },
    { icon: <CreditCard />, label: 'Accounts', key: Tab.ACCOUNTS },
    { icon: <DollarSign />, label: 'Transactions', key: Tab.TRANSACTIONS },
    { icon: <ShoppingBag />, label: 'Store Purchase', key: Tab.STORE_PURCHASE },
    { icon: <Bell />, label: 'Notifications', key: Tab.NOTIFICATIONS },
    { icon: <User />, label: 'Profile', key: Tab.PROFILE },
    { icon: <Settings />, label: 'Settings', key: Tab.SETTINGS }
  ];

export function Sidebar() {
    const { activeTab, setActiveTab } = useTabContext();
    const { handleLogout } = useAuthContext();
    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-4">
                <h1 className="text-2xl font-bold text-blue-600">DigiWallet</h1>
            </div>
            <nav className="mt-6">
                {sidebarLinks.map((link) => (
                <button
                    key={link.key}
                    className={`flex items-center w-full py-2 px-4 ${
                    activeTab === link.key ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveTab(link.key)}
                >
                    {React.cloneElement(link.icon, { size: 18, className: 'mr-2' })}
                    {link.label}
                </button>
                ))}
            </nav>
            <div className="absolute bottom-0 w-64 p-4">
                <button className="flex items-center text-gray-600 hover:text-red-500" onClick={handleLogout}>
                <LogOut className="mr-2" size={18} />
                Logout
                </button>
            </div>
        </div>
    )
}