import React, { useState } from "react";
import { CreditCard } from "lucide-react";

interface PaymentMethodFormProps {
    handleAddPaymentMethod: (e: React.FormEvent, cardNumber: string, cardExpiry: string, cardCVV: string) => void
}

export function PaymenMethodForm( { handleAddPaymentMethod }: PaymentMethodFormProps) {
    const [newCardNumber, setNewCardNumber] = useState('');
    const [newCardExpiry, setNewCardExpiry] = useState('');
    const [newCardCVV, setNewCardCVV] = useState('');
    return (
        <form onSubmit={(e) => handleAddPaymentMethod(e, newCardNumber, newCardExpiry, newCardCVV)} className="space-y-2">
            <input
              type="text"
              value={newCardNumber}
              onChange={(e) => setNewCardNumber(e.target.value)}
              placeholder="Card Number"
              className="w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
            />
            <div className="flex space-x-2">
              <input
                type="text"
                value={newCardExpiry}
                onChange={(e) => setNewCardExpiry(e.target.value)}
                placeholder="MM/YY"
                className="flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
              />
              <input
                type="text"
                value={newCardCVV}
                onChange={(e) => setNewCardCVV(e.target.value)}
                placeholder="CVV"
                className="flex-grow shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <CreditCard size={18} className="mr-2" />
              Add Payment Method
            </button>
          </form>
    )
}