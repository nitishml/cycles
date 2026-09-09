import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddRoutineDTO } from '../types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const addRoutine = async (formData: AddRoutineDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/routine`, {
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

export const useAddRoutine = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, AddRoutineDTO>({
        mutationFn: addRoutine,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['routine'] });
            queryClient.invalidateQueries({ queryKey: ['cycle'] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        retry: (failureCount, error) => {
            if (error.message.includes('4')) return false;
            return failureCount < 2;
        },
        mutationKey: ['add-routine'],
    });
};