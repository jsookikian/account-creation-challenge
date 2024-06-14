import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateAccountFormData } from './useValidationResolver';

interface UseCreateAccountProps {
    loading: boolean;
    error: string | null;
    status: number | null;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    createAccount: (data: CreateAccountFormData) => Promise<any>;
}

export function useCreateAccount(): UseCreateAccountProps {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState<number | null>(null);

    const navigate = useNavigate();

    const createAccount = async (data: CreateAccountFormData) => {
        setLoading(true);
        setError(null);
        setStatus(null);

        try {
            const response = await fetch('/api/create_account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ user: data }),
            });
            setStatus(response.status);

            if (response.ok) {
                const result = await response.json();
                setLoading(false);
                localStorage.setItem('token', result.token)
                navigate('/signup/account-selection');
                return result;
            } else {
                const errorData = await response.json();
                setLoading(false);
                setError(errorData.message || 'Error creating account');
            }
        }
        /* eslint-disable @typescript-eslint/no-explicit-any */
        catch (error: any) {
            setLoading(false);
            setError(error?.message || 'Unknown error occured');
        }
    };

    return { loading, error, status, createAccount };
}