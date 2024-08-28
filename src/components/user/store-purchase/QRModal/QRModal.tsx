import React from 'react';

interface QRModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

export function QRModal( { onClose, children } : QRModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                </button>
                {children}
            </div>
        </div>
    );
};
