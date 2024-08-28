
export type Transaction = {
    _id: number;
    createdAt: string;
    type: string;
    amount: number;
};

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
        try {
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
        catch {
            console.error('Network or Server Error');
        }
    }

    async deposit(token: string | null, amount: number, paymentMethodId: string) {
        try {
            const response = await fetch('http://localhost:3000/api/wallet/deposit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount, paymentMethodId })
            });

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

    async transfer(token: string | null, amount: number, toUserId: string) {
        try {
            const response = await fetch('http://localhost:3000/api/wallet/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount, toUserId })
            });

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

    async listTransactions(token: string | null) {
        try {
            const response = await fetch('http://localhost:3000/api/wallet/transactions', {
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

                const mapped : Transaction[] = result.map((transaction: Transaction) => {
                    return {
                        _id: transaction._id,
                        createdAt: transaction.createdAt,
                        type: transaction.type,
                        amount: transaction.amount
                    }
                })
                
                return mapped
            }
        }
        catch {
            console.error('Network or Server Error');
        }
    }

    async generateQR(token: string | null, amount : number) {
        try {
            const result = await fetch('http://localhost:3000/api/wallet/generate-qr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ amount })
            });

            if(!result.ok) {
                const errorData = await result.json();
                console.error('Error:', errorData.message || errorData);
                return errorData
            }

            const qrData = await result.json();
            return qrData
        }
        catch {
            console.error('Network or Server Error');
        }
    }

    async initiateQR(token: string | null, paymentId : string, paymentMethodId : string) {
        try {
            const result = await fetch('http://localhost:3000/api/wallet/initiate-qr-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ paymentId, paymentMethodId })
            });

            if(!result.ok) {
                const errorData = await result.json();
                console.error('Error:', errorData.message || errorData);
                return errorData
            }
            else {
                console.log("Past inititate")
                
                const qrData = await result.json();
                console.log(qrData)
                const paymentIntentId = qrData.paymentIntentId
                console.log(paymentIntentId)

                const confResult = await fetch('http://localhost:3000/api/wallet/confirm-qr-payment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ paymentIntentId, paymentMethodId })
                });
                console.log("After fetch")

                if(confResult.ok) {
                    const qrData = await confResult.json();
                    console.log(qrData)
                    return qrData
                }
            }
        }
        catch {
            console.log('Network or Server Error');
        }
    }
}


