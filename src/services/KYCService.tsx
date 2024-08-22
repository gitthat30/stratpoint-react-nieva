
export class KYCService {
    async getKYCStatus(token : string | null) {
        try {
            const response = await fetch('http://localhost:3000/api/kyc/status', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message || errorData);

                return "Error"
            } else {
                const result = await response.json();

                return result.status;
            }
        }
        catch {
            console.error('Network or Server Error');

            return "Error"
        }
    }

    async initiateKYC(token : string | null, file : File) {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await fetch('http://localhost:3000/api/kyc/initiate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData.message || errorData);
        }
        else {
            const result = await response.json();
            console.log('Success:', result.message || result);
        }

    }
}