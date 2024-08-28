import React from "react";
import { useZxing } from "react-zxing"

interface QRScannerProps {
    onScan: (code: string) => void;
    qrCodeUrl: string | null;
}

export function QRScanner( { qrCodeUrl } : QRScannerProps) {
    const { ref } = useZxing({
        onDecodeResult(result) {
          console.log(result)
        },
      });

    return (
        <div className="bg-gray-200 p-4 rounded-lg text-center">
            {qrCodeUrl ? (
                <>
                    <img src={qrCodeUrl} alt="QR Code" className="mb-2 w-32 h-32" />
                    <video ref={ref} />
                </>
                    
                    
                ) : (
                    <>
                        <video ref={ref} />
                     </>
                )}
        </div>
    )
}