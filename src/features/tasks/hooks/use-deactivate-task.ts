import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeactivateTaskDTO } from '../types';


type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const deactivateTask = async (formData: DeactivateTaskDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/task/manage/${formData.id}`, {
        method: 'DELETE',
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

export const useDeactivateTask = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, DeactivateTaskDTO>({
        mutationFn: deactivateTask,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['task'] });
            queryClient.invalidateQueries({ queryKey: ['task', 'manage', data.data?.id!] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        // retry: (failureCount, error) => {
        //     if (error.message.includes('4')) return false;
        //     return failureCount < 2;
        // },
        mutationKey: ['deactivate-task'],
    });
};