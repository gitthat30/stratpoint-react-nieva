import React from 'react';
import { useTabContext } from '../../../../hooks/useTabContext';

export function Header() {
    const { activeTab } = useTabContext();
    return (
        <div className="bg-header shadow-sm">
          <div className="hidden lg:block max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-header-text">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          </div>
        </div>
    )
}