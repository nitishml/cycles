import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CompleteTaskDTO } from '../types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const completeTask = async (formData: CompleteTaskDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/cycle/tasks/complete`, {
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

export const useCompleteTask = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, CompleteTaskDTO>({
        mutationFn: completeTask,
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
        mutationKey: ['complete-task'],
    });
};