
export class WalletService {

    async getBalance(token : string | null) {
        try {
            const response = await fetch('http://localhost:3000/api/wallet/balance', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message || errorData);
                return errorData
            } else {
                const result = await response.json();
                return result;
            }
        }
        catch {
            console.error('Network or Server Error');
        }
    }

    async createWallet(token : string | null) {
        try {
            const response = await fetch('http://localhost:3000/api/wallet/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message || errorData);
                return errorData
            }
            else {
                const result = await response.json();
                return result
            }
        }
        catch {
            console.error('Network or Server Error');
        }
    }

    async createPaymentIntent(token : string | null, amount : number) {
        try {
            const response = await fetch('http://localhost:3000/api/wallet/create-payment-intent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ amount })  
            })

            if(!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message || errorData);
                return errorData
            }
            else {
                const result = await response.json();
                return result
            }
        }
        catch {
            console.error('Network or Server Error');
        }
    }

    async confirmPaymentIntent(token: string | null, paymentIntentId: string, paymentMethodId : string) {
        try {
            const response = await fetch('http://localhost:3000/api/wallet/confirm-payment-intent', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ paymentIntentId, paymentMethodId })  
            })

            if(!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message || errorData);
                return errorData
            }
            else {
                const result = await response.json();
                return result
            }
        }
        catch {
            console.error('Network or Server Error');
        }
    }

    async addPaymentMethod(token: string | null, paymentMethodId: string) {
        try {
            const response = await fetch('http://localhost:3000/api/wallet/add-payment-method', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({ paymentMethodId })  
            })

            if(!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message || errorData);
                return errorData
            }
            else {
                const result = await response.json();
                return result
            }
        }
        catch {
            console.error('Network or Server Error');
        }
    }

    async listPaymentMethods(token: string | null) {
        const response = await fetch('http://localhost:3000/api/wallet/payment-methods', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData.message || errorData);
            return errorData
        } else {
            const result = await response.json();
            return result
        }
    }
}