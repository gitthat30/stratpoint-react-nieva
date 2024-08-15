import React from "react";
import { Store, ScanningModeEnum, Item } from "./types";
import { QrCode, X, CreditCard } from 'lucide-react';
import { QRScanner } from "../QRScanner/QRScanner";


interface StoreCardProps {
    handleScan: (code: string) => void;
    startScanning: (mode: ScanningModeEnum) => void;
    scanningMode: ScanningModeEnum | null;
    selectedStore: Store | null;
    cart: Item[];
    total: number;
    removeFromCart: (item: Item) => void;
    processPayment: () => void;
}

export function StoreCard( { handleScan, startScanning, scanningMode, selectedStore, cart, total, removeFromCart, processPayment }: StoreCardProps ) {
    return (
        <>
            {!selectedStore ? (
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Select a Store</h3>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                        {scanningMode === ScanningModeEnum.Store ? (
                        <QRScanner onScan={handleScan} />
                        ) : (
                        <button 
                            onClick={() => startScanning(ScanningModeEnum.Store)}
                            className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <QrCode size={18} className="mr-2" />
                            Scan Store QR Code
                        </button>
                        )}
                    </div>
                    </div>
                ) : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedStore.name}</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{selectedStore.distance}</p>
                    </div>
                    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                        <div className="grid grid-cols-2 gap-4">
                        <div>
                            <h4 className="text-md font-medium text-gray-900 mb-2">Scan Items</h4>
                            {scanningMode === ScanningModeEnum.Item ? (
                            <QRScanner onScan={handleScan} />
                            ) : (
                            <button 
                                onClick={() => startScanning(ScanningModeEnum.Item)}
                                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                                <QrCode size={18} className="mr-2" />
                                Scan Item QR Code
                            </button>
                            )}
                        </div>
                        <div>
                            <h4 className="text-md font-medium text-gray-900 mb-2">Your Cart</h4>
                            <ul className="divide-y divide-gray-200">
                            {cart.map(item => (
                                <li key={item.id} className="py-2">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-gray-900">{item.name} - ${item.price.toFixed(2)}</p>
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
                            <p className="text-lg font-medium text-gray-900">Total: ${total.toFixed(2)}</p>
                            <button 
                                onClick={processPayment}
                                className="mt-2 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
        </>
    )
}