import React, { useState } from "react";
import { Store, ScanningModeEnum, Item } from "./types";
import { QrCode, X, CreditCard } from 'lucide-react';
import { QRScanner } from "../QRScanner/QRScanner";
import { QRModal } from "../QRModal/QRModal";
import { useAuthContext, useWalletContext } from "../../../../hooks";
import { WalletService } from "../../../../services";
import { useZxing } from "react-zxing";

interface StoreCardProps {
    handleScan: (code: string) => void;
    startScanning: (mode: ScanningModeEnum) => void;
    scanningMode: ScanningModeEnum | null;
    selectedStore: Store | null;
    cart: Item[];
    total: number;
    removeFromCart: (item: Item) => void;
    processPayment: () => void;
    qrCodeDataURL: string | null;
}

export function StoreCard({
    handleScan,
    scanningMode,
    selectedStore,
    cart,
    total,
    removeFromCart,
    processPayment,
    qrCodeDataURL
}: StoreCardProps) {
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [amount, setAmount] = useState<number>(total);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isScannerOpen] = useState<boolean>(false);
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);

    console.log(isScannerOpen)
    const { token } = useAuthContext();
    const walletService = new WalletService();

    const { paymentMethods } = useWalletContext();

    const { ref } = useZxing({
        async onDecodeResult(result) {
          const data = JSON.parse(result.getText());
          console.log(data)

          const qrResult = await walletService.initiateQR(token, data.paymentId, paymentMethod);

          if(qrResult) {
              console.log(qrResult)
              setQrCodeData("")
          }
        },
      });

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(parseFloat(e.target.value));
    };

    async function generateQRCode(){
        const result = await walletService.generateQR(token, amount); 
        if(result) {
            setQrCodeData(result.qrCodeDataURL); 
        }
        setIsModalOpen(false);
    };

    return (
        <>
            {!selectedStore ? (
                <div className="bg-card-background shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-card-header">Generate Payment QR</h3>
                    </div>
                    <div className="border-t border-border px-4 py-5 sm:p-6">
                        {!qrCodeData ? (
                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setIsModalOpen(true)}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-button-text bg-button hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    <QrCode size={18} className="mr-2" />
                                    Generate QR Code
                                </button>
                            </div>
                        ) : (
                            <div className="text-center mb-4">
                                <img src={qrCodeData} alt="Payment QR Code" className="mx-auto" />
                                <p className="text-sm text-gray-600 mt-2">Scan this QR code to make a payment.</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-card-background shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-card-header">{selectedStore.name}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-card-text-small">{selectedStore.distance}</p>
                    </div>
                    <div className="border-t border-border px-4 py-5 sm:px-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <h4 className="text-md font-medium text-card-header mb-2">Scan Items</h4>
                                {scanningMode === ScanningModeEnum.Item ? (
                                    <QRScanner 
                                        onScan={handleScan}
                                        qrCodeUrl={qrCodeDataURL}
                                    />
                                ) : null}
                            </div>
                            <div>
                                <h4 className="text-md font-medium text-header-text mb-2">Your Cart</h4>
                                <ul className="divide-y divide-border">
                                    {cart.map(item => (
                                        <li key={item.id} className="py-2">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-medium text-header-text">{item.name} - ${item.price.toFixed(2)}</p>
                                                <button 
                                                    onClick={() => removeFromCart(item)}
                                                    className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                                >
                                                    <X size={14} />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-4">
                                    <p className="text-lg font-medium text-header-text">Total: ${total.toFixed(2)}</p>
                                    <button 
                                        onClick={processPayment}
                                        className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-button-text bg-button hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        <CreditCard size={18} className="mr-2" />
                                        Pay Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && (
                <QRModal onClose={() => setIsModalOpen(false)}>
                    <h4 className="text-lg font-medium text-card-header mb-4">Generate QR Code</h4>
                    <div className="flex flex-col gap-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Payment Method
                            <select
                                id="payment-method"
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                            >
                                <option value="">Select Payment Method</option>
                                {paymentMethods.map(method => (
                                    <option key={method.id} value={method.id}>{method.type}</option>
                                ))}
                            </select>
                        </label>
                        <label className="block text-sm font-medium text-gray-700">
                            Amount
                            <input
                                type="number"
                                value={amount}
                                onChange={handleAmountChange}
                                min="0"
                                step="0.01"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </label>
                        <button 
                            onClick={generateQRCode}
                            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-button-text bg-button hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Generate QR Code
                        </button>
                    </div>
                </QRModal>
                
            )}

            <>
                <video ref={ref} />
            </>
        </>
    );
}
