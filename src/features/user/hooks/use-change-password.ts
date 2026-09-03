import { useMutation, useQueryClient } from '@tanstack/react-query';


type ApiResponse = {
    success: boolean;
    data: {} | null;
    message?: string;
}

type ApiRequest = {
    newPassword: string;
}

const changePassword = async (formData: ApiRequest): Promise<ApiResponse> => {
    const response = await fetch('/api/auth/change-password', {
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

export const useChangePassword = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, ApiRequest>({
        mutationFn: changePassword,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
        onError: (error) => {

        },

        mutationKey: ['change-password'],
    });
};