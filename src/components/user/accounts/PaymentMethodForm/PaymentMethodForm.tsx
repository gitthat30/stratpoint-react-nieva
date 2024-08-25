import React, { useState } from "react";
import { CreditCard } from "lucide-react";

interface PaymentMethodFormProps {
    handleAddPaymentMethod: (paymentMethodId: string) => void
}

export function PaymenMethodForm( { handleAddPaymentMethod }: PaymentMethodFormProps) {
    const [paymentMethodId, setPaymentMethodId] = useState("");
    return (
        <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              value={paymentMethodId}
              onChange={(e) => setPaymentMethodId(e.target.value)}
              placeholder="Enter Payment Method ID"
              className="col-span-2 justify-center w-full shadow-sm border px-2 bg-background text-card-text focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-border rounded-md"
            />
            <button onClick={() => handleAddPaymentMethod(paymentMethodId)} className="col-span-2 w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-button-text bg-button hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <CreditCard size={18} className="mr-2" />
              Add Payment Method
            </button>
        </div>
    )
}