import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AddTaskDTO } from '../types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const addTask = async (formData: AddTaskDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/task`, {
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

export const useAddTask = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, AddTaskDTO>({
        mutationFn: addTask,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['task'] });
            // queryClient.invalidateQueries({ queryKey: ['active-postings'] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        retry: (failureCount, error) => {
            if (error.message.includes('4')) return false;
            return failureCount < 2;
        },
        mutationKey: ['add-task'],
    });
};