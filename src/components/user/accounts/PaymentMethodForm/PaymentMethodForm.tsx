import React, { useState } from "react";
import { CreditCard } from "lucide-react";

interface PaymentMethodFormProps {
    handleAddPaymentMethod: (paymentMethodId: string) => void
}

export function PaymenMethodForm( { handleAddPaymentMethod }: PaymentMethodFormProps) {
  const [paymentMethodId, setPaymentMethodId] = useState("");

  enum PaymentMethodIds {
    Visa = "pm_card_visa",
    Mastercard = "pm_card_mastercard",
    "American Express" = "pm_card_amex",
    Discover = "pm_card_discover",
    "Diners Club" = "pm_card_diners",
    JCB = "pm_card_jcb",
    "Union Pay" = "pm_card_unionpay"
  }

  interface PaymentMethodDropDown {
      id: string,
      name: string
  }

  const [ paymentMethodChoices ] = useState<PaymentMethodDropDown[]>([
      { id: PaymentMethodIds.Visa, name: "Visa" },
      { id: PaymentMethodIds.Mastercard, name: "Mastercard" },
      { id: PaymentMethodIds["American Express"], name: "American Express" },
      { id: PaymentMethodIds.Discover, name: "Discover" },
      { id: PaymentMethodIds["Diners Club"], name: "Diners Club" },
      { id: PaymentMethodIds.JCB, name: "JCB" },
      { id: PaymentMethodIds["Union Pay"], name: "Union Pay" }
  ]);

  return (
      <div className="grid grid-cols-2 gap-3">
          <select
            value={paymentMethodId}
            onChange={(e) => setPaymentMethodId(e.target.value)}
            className="col-span-2 justify-center w-full shadow-sm border px-2 bg-background text-card-text focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-border rounded-md"
          >
            <option value="" disabled>
              Select a Payment Method
            </option>
            {paymentMethodChoices.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>
          <button onClick={() => handleAddPaymentMethod(paymentMethodId)} className="col-span-2 w-full inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-button-text bg-button hover:bg-button-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <CreditCard size={18} className="mr-2" />
            Add Payment Method
          </button>
      </div>
  )
}