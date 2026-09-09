import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddLedgerEntryDTO } from '../types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const addLedgerEntry = async (formData: AddLedgerEntryDTO): Promise<ApiResponse> => {
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

    return useMutation<ApiResponse, Error, AddLedgerEntryDTO>({
        mutationFn: addLedgerEntry,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['cycle'] });
            queryClient.invalidateQueries({ queryKey: ['ledger', 'daily'] });
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