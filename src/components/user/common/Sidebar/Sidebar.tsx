import React from 'react';
import { Home, CreditCard, DollarSign, Bell, User, Settings, LogOut, ShoppingBag } from 'lucide-react';
import { useTabContext } from '../../../../hooks/useTabContext';
import { Tab } from '../../../../contexts/types';
import { useAuthContext } from '../../../../hooks';
// import { Menu } from 'react-burger-menu'

const sidebarLinks = [
    { icon: <Home />, label: 'Home', key: Tab.HOME },
    { icon: <CreditCard />, label: 'Accounts', key: Tab.ACCOUNTS },
    { icon: <DollarSign />, label: 'Transactions', key: Tab.TRANSACTIONS },
    { icon: <ShoppingBag />, label: 'Store Purchase', key: Tab.STORE_PURCHASE },
    { icon: <Bell />, label: 'Notifications', key: Tab.NOTIFICATIONS },
    { icon: <User />, label: 'Profile', key: Tab.PROFILE },
    { icon: <Settings />, label: 'Settings', key: Tab.SETTINGS }
  ];


interface SidebarProps {
    handleTabChange: (key: Tab) => void;
}

export function Sidebar({ handleTabChange }: SidebarProps) {
    const { activeTab } = useTabContext();
    const { handleLogout } = useAuthContext();
    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-bold text-blue-600">DigiWallet</h1>
            </div>
            <nav className="mt-6">
                {sidebarLinks.map((link) => (
                <button
                    key={link.key}
                    className={`flex items-center w-full py-2 px-4 ${
                    activeTab === link.key ? 'bg-sidebar-highlighted text-blue-600' : 'text-header-text hover:bg-sidebar-hover hover:text-black'
                    }`}
                    onClick={() => handleTabChange(link.key)}
                >
                    {React.cloneElement(link.icon, { size: 18, className: 'mr-2' })}
                    {link.label}
                </button>
                ))}
            </nav>
            <div className="absolute bottom-0 w-64 p-4">
                <button className="flex items-center text-header-text hover:text-red-500" onClick={handleLogout}>
                <LogOut className="mr-2" size={18} />
                Logout
                </button>
            </div>
        </>
    )
}