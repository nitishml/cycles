import { useMutation, useQueryClient } from '@tanstack/react-query';



type ApiResponse = {
    success: boolean;
    data: {
        id: string
    } | null;
    message?: string | null;
}


type ApiRequest = {
    userId: string;
    token: string;
    newPassword: string;
}

const resetPassword = async (formData: ApiRequest): Promise<ApiResponse> => {
    const response = await fetch('/api/auth/reset-password/new-password', {
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

export const useResetPassword = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, ApiRequest>({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
        onError: (error) => {

        },

        mutationKey: ['reset-password'],
    });
};