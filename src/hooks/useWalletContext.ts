import { WalletContext } from '../contexts';
import { useContext } from 'react';

export function useWalletContext() {
    const context = useContext(WalletContext);

    if (!context) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    else {
        return context
    }
}