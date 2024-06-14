import { useCallback } from 'react';
import zxcvbn from 'zxcvbn';

export interface CreateAccountFormData {
    username: string;
    password: string;
}

export const validatePassword = (password: string) => {
    const result = zxcvbn(password);
    if (result.score < 2) {
        return {
            isValid: false,
            message: 'Password is too weak.'
        };
    }
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one letter and one number.'
        };
    }
    return {
        isValid: true,
        message: ''
    };
};

export const useValidationResolver = () =>
    useCallback(async (data: CreateAccountFormData) => {
        const errors: Record<string, { type: string; message: string }> = {};

        if (data.username.length < 10 || data.username.length > 50) {
            errors.username = {
                type: 'validation',
                message: 'Username must be between 10 and 50 characters.',
            };
        }

        const passwordValidation = validatePassword(data.password);
        if (passwordValidation.isValid !== true) {
            errors.password = {
                type: 'validation',
                message: passwordValidation.message,
            };
        }

        return {
            values: Object.keys(errors).length === 0 ? data : {},
            errors: errors,
        };
    }, []);
