import React, { useEffect, useState } from "react";
import { PaymentMethodType } from "../../../../contexts";

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (amount: number, transactionDetails: { paymentMethod? : string, toUserId? : string }, transactionType: string) => void;
    transactionType: string;
    paymentMethods: PaymentMethodType[];
  }

  export function TransactionModalCard({isOpen, onClose, onSubmit, transactionType, paymentMethods}: TransactionModalProps) {
    const [amount, setAmount] = useState<string>('');
    const [paymentMethod, setPaymentMethod] = useState<string>('');
    const [toUserId, setToUserId] = useState<string>('');
    
    useEffect(() => {
        setPaymentMethod('');
        setAmount('');
        setToUserId('');
    }, [isOpen]);

    if(!isOpen) {
        return null
    }
   
    return (
        isOpen ? (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{transactionType}</h3>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
    
              {transactionType === 'Add Funds' && (
                <div className="mb-4">
                  <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700">Payment Method</label>
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
                </div>
              )}
    
              {transactionType === 'Send Money' && (
                <div className="mb-4">
                  <label htmlFor="to-user-id" className="block text-sm font-medium text-gray-700">Recipient User ID</label>
                  <input
                    type="text"
                    id="to-user-id"
                    value={toUserId}
                    onChange={(e) => setToUserId(e.target.value)}
                    placeholder="Enter recipient's User ID"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
              )}
    
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => onSubmit(Number(amount), { paymentMethod, toUserId }, transactionType)}
                  disabled={
                    Number(amount) <= 0 ||
                    (transactionType === 'Add Funds' && (!paymentMethod || paymentMethod === 'Select Payment Method')) ||
                    (transactionType === 'Transfer' && !toUserId)
                  }
                  className={`py-2 px-4 rounded ${Number(amount) <= 0 || (transactionType === 'Add Funds' && (!paymentMethod || paymentMethod === 'Select Payment Method')) || (transactionType === 'Transfer' && !toUserId) ? 'bg-gray-300' : 'bg-blue-600'} text-white hover:bg-blue-700`}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : null
      );
  }