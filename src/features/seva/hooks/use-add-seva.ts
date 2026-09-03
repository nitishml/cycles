import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddSevaDTO } from '../types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const addSeva = async (formData: AddSevaDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/seva`, {
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

export const useAddSeva = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, AddSevaDTO>({
        mutationFn: addSeva,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['seva'] });
            // queryClient.invalidateQueries({ queryKey: ['active-postings'] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        retry: (failureCount, error) => {
            if (error.message.includes('4')) return false;
            return failureCount < 2;
        },
        mutationKey: ['add-seva'],
    });
};