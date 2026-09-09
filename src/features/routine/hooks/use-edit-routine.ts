import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditRoutineDTO } from '../types';


type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const editRoutine = async (formData: EditRoutineDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/routine/manage/${formData.id}`, {
        method: 'PUT',
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

export const useEditRoutine = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, EditRoutineDTO>({
        mutationFn: editRoutine,
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
        mutationKey: ['edit-routine'],
    });
};