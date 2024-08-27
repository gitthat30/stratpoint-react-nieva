import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { KYCContextType } from './types';
import { KYCService } from '../services';
import { useAuthContext } from '../hooks';

export const KYCContext = createContext<KYCContextType | undefined>(undefined);

export function KYCProvider({ children } : { children : ReactNode}) {
    const [kycApproved, setkycApproved] = useState<boolean>(false);

    const kycService = new KYCService();

    const { token } = useAuthContext();

    async function checkKYCStatus() {
        const status = await kycService.getKYCStatus(token);
        if(status === "approved") {
            setkycApproved(true);
        }
        else {
            setkycApproved(false);
        }
    }

    useEffect(() => {
        checkKYCStatus();
    }, [])

    return (
        <KYCContext.Provider value={{ kycApproved, checkKYCStatus }}>
            {children}
        </KYCContext.Provider>
    )
}