import { PersonStandingIcon } from "lucide-react";
import React from "react";

interface KYCFieldProps {
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function KYCField( { handleFileChange, file, handleSubmit }: KYCFieldProps) {
    return(
        <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 items-center">
            <label 
                htmlFor="file" 
                className="flex items-center text-header-text text-sm col-span-1 font-medium"
            >
                <PersonStandingIcon className="mr-2" />
                KYC Document
            </label>
            <input 
                type="file" 
                onChange={handleFileChange} 
                className="w-full sm:col-span-1 p-2 border border-border rounded-md col-span-2 shadow-sm text-card-text-small bg-background focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />            
            
            <button 
                type="submit" 
                disabled={!file} 
                className="col-span-3 inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-button-text bg-button hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Upload KYC Document
            </button>
        </form>
    )
}