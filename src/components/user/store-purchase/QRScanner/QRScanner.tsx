import React from "react";

interface QRScannerProps {
    onScan: (code: string) => void;
}

export function QRScanner( { onScan }: QRScannerProps ) {
    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center">
            <p className="mb-2">Scanning QR Code...</p>
            <input 
                type="text" 
                placeholder="Enter QR code" 
                className="p-2 border rounded"
                onKeyPress={(e : React.KeyboardEvent<HTMLInputElement>) => {
                    if (e.key === 'Enter') {
                        onScan(e.currentTarget.value);
                        e.currentTarget.value = '';
                    }
                }}
            />
            <p className="mt-2 text-sm text-gray-600">
                (In a real app, this would use the device's camera)
            </p>
        </div>
    )
}