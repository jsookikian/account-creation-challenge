import { useState, useEffect } from 'react';

export function useIsLoggedIn() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const payload = JSON.parse(atob(token.split('.')[1]));
            if (payload.exp * 1000 > Date.now()) {
                // Token is not expired, now verify with the server
                fetch('/api/verify_token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.valid) {
                            setIsLoggedIn(true);
                        } else {
                            localStorage.removeItem('token');
                        }
                        setLoading(false);
                    })
                    .catch(() => {
                        localStorage.removeItem('token');
                        setLoading(false);
                    });
            } else {
                localStorage.removeItem('token');
                setLoading(false);
            }
        } else {
            setLoading(false);
        }
    }, []);

    return { isLoggedIn, loading };
}
