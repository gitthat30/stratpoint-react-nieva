import React, {useState} from "react";
import { StoreCard, Store, Item, ScanningModeEnum } from "../../components/user/store-purchase";

export function StorePurchase() {
    const [scanningMode, setScanningMode] = useState<ScanningModeEnum | null>(null); // 'store' or 'item'
    const [selectedStore, setSelectedStore] = useState<Store | null>(null);
    const [cart, setCart] = useState<Item[]>([]);
    const [total, setTotal] = useState<number>(0);

    const storeQrs : Record<string, Store> = {
        store123: { id: 1, name: 'Grocery Store', distance: '0.5 miles' },
        store456: { id: 2, name: 'Electronics Shop', distance: '1.2 miles' },
    }

    const itemQrs : Record<string, Item> = {
        item789: { id: 1, name: 'Milk', price: 3.99 },
        itemABC: { id: 2, name: 'Bread', price: 2.49 },
    }

    function startScanning (mode : ScanningModeEnum) {
        setScanningMode(mode);
    };

    function handleScan (qrCode : string) {
        if (scanningMode === 'store') {
          const store = storeQrs[qrCode];
          if (store) {
            setSelectedStore(store);
            setScanningMode(null);
          } else {
            alert('Invalid store QR code');
          }
        } else if (scanningMode === 'item') {
          const item = itemQrs[qrCode];
          if (item) {
            addToCart(item);
            setScanningMode(null);
          } else {
            alert('Invalid item QR code');
          }
        }
    };

    function addToCart(item : Item) {
        setCart([...cart, item]);
        setTotal(total + item.price);
    };

    const removeFromCart = (item : Item) => {
        const newCart = cart.filter(i => i.id !== item.id);
        setCart(newCart);
        setTotal(total - item.price);
    };
    
    const processPayment = () => {
        // In a real app, this would integrate with a payment gateway
        alert(`Payment of $${total.toFixed(2)} processed successfully!`);
        // Here you would typically call an API to record the transaction
        setCart([]);
        setTotal(0);
        setSelectedStore(null);
    };

    return (
        <div className="space-y-6">
            <StoreCard 
                handleScan={handleScan}
                startScanning={startScanning}
                scanningMode={scanningMode}
                selectedStore={selectedStore}
                cart={cart}
                total={total}
                processPayment={processPayment}
                removeFromCart={removeFromCart}
                />
        </div>
    )
}