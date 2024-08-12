import React, { createContext, useState, ReactNode } from 'react';
import { Tab, TabContextType } from './types';

export const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children } : { children : ReactNode}) {
    const [activeTab, setActiveTab] = useState<Tab>(Tab.HOME);

    return (
        <TabContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabContext.Provider>
    );
}