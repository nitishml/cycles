import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LedgerEntryDTO } from '../types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const addLedgerEntry = async (formData: LedgerEntryDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/cycle/ledger-entry`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const useAddLedgerEntry = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, LedgerEntryDTO>({
        mutationFn: addLedgerEntry,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['cycle'] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        retry: (failureCount, error) => {
            if (error.message.includes('4')) return false;
            return failureCount < 2;
        },
        mutationKey: ['ledger-entry'],
    });
};