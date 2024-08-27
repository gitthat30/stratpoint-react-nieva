import { useContext } from "react";
import { KYCContext } from "../contexts";

export const useKYCContext = () => {
        const context = useContext(KYCContext);
        if (!context) {
            throw new Error('useKYC must be used within a KYCProvider');
        }
        return context;
    }