import { TabContext } from '../contexts';
import { useContext } from 'react';

export function useTabContext() {
    const context = useContext(TabContext);

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');   
    }

    return context;
}
