import React from "react";
import { Trash2 } from "lucide-react";
import { PaymenMethodForm } from "../PaymentMethodForm/PaymentMethodForm"; 

export type PaymentMethodType = {
    id: number
    type: string
    last4: string
    expiryDate: string
}

interface PaymentMethod {
    paymentMethods : PaymentMethodType[],
    handleRemovePaymentMethod: (id: number) => void
    handleAddPaymentMethod: (e: React.FormEvent, cardNumber: string, expiryDate: string, cvv: string) => void
}

export function PaymentMethodCard( { paymentMethods, handleRemovePaymentMethod, handleAddPaymentMethod }: PaymentMethod) {
    return (
        <div className="bg-card-background shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-header-text">Payment Methods</h3>
        </div>
        <div className="border-t border-border">
          <ul className="divide-y divide-border">
            {paymentMethods.map(method => (
              <li key={method.id} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-card-text truncate">{method.type} ending in {method.last4}</p>
                    <p className="text-sm text-card-text-small">Expires: {method.expiryDate}</p>
                  </div>
                  <button onClick={() => handleRemovePaymentMethod(method.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-4 py-4 sm:px-6">
          <PaymenMethodForm handleAddPaymentMethod={handleAddPaymentMethod}/>
        </div>
      </div>
    )
}