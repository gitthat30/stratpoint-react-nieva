
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
            } else {
                const result = await response.json();
                return result;
            }
        }
        catch {
            console.error('Network or Server Error');
        }
    }
}