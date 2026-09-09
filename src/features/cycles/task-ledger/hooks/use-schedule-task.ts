import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ScheduleTaskDTO } from '../types';

type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const scheduleTask = async (formData: ScheduleTaskDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/cycle/tasks/schedule`, {
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

export const useScheduleTask = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, ScheduleTaskDTO>({
        mutationFn: scheduleTask,
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
        mutationKey: ['schedule-task'],
    });
};