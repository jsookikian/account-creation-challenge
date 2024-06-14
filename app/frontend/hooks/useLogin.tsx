import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const login = async (username: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const result = await response.json();
                localStorage.setItem('token', result.token);
                navigate('/signup/account-selection');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Login failed');
            }

        }
        /* eslint-disable @typescript-eslint/no-explicit-any */
        catch (error: any) {
            setError(error.message || 'Network error');
        } finally {
            setLoading(false);
        }
    };

    return { login, loading, error };
}