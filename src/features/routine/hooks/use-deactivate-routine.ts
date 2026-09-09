import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DeactivateRoutineDTO } from '../types';


type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const deactivateRoutine = async (formData: DeactivateRoutineDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/routine/manage/${formData.id}`, {
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

export const useDeactivateRoutine = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, DeactivateRoutineDTO>({
        mutationFn: deactivateRoutine,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['routine'] });
            queryClient.invalidateQueries({ queryKey: ['routine', 'manage', data.data?.id!] });

            queryClient.invalidateQueries({ queryKey: ['cycle', 'routines'] });

        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        // retry: (failureCount, error) => {
        //     if (error.message.includes('4')) return false;
        //     return failureCount < 2;
        // },
        mutationKey: ['deactivate-routine'],
    });
};