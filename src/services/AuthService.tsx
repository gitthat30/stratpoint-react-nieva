
export class AuthService {


    async register(firstName : string, lastName: string, email: string, password: string) {
        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message || errorData);
            } else {
                const result = await response.json();
                console.log('Success:', result.message || result);
            }
        } catch (error) {
            console.error('Network or Server Error:', error);
        }
    }

    async login(email: string, password: string) {
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message || errorData);
            } else {
                const result = await response.json();
                console.log('Success:', result.message || result);

                return result
            }    
        } catch (error) {
            console.error('Network or Server Error:', error);
        }
    }
}
