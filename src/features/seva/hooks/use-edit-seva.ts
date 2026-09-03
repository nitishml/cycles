import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EditSevaDTO } from '../types';


type ApiResponse = {
    success: boolean;
    data: {
        id: string;
    } | null;
    message?: string | null;
}

const editSeva = async (formData: EditSevaDTO): Promise<ApiResponse> => {
    const response = await fetch(`/api/seva/manage/${formData.id}`, {
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

export const useEditSeva = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, EditSevaDTO>({
        mutationFn: editSeva,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['seva'] });
            queryClient.invalidateQueries({ queryKey: ['seva', 'manage', data.data?.id!] });
        },
        onError: (error) => {
            console.error('Form submission failed:', error);
        },
        // retry: (failureCount, error) => {
        //     if (error.message.includes('4')) return false;
        //     return failureCount < 2;
        // },
        mutationKey: ['edit-seva'],
    });
};