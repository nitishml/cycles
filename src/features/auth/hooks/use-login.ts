import { useMutation, useQueryClient } from '@tanstack/react-query';

type ApiRequest = {
    mobile: string;
    password: string;
}

type ApiResponse = {
    success: boolean;
    data: string | null;
    message?: string | null;
}

const mobileLogin = async (formData: ApiRequest): Promise<ApiResponse> => {
    const response = await fetch('/api/auth/login', {
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

export const useMobileLogin = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, ApiRequest>({
        mutationFn: mobileLogin,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
        },
        onError: (error) => {

        },
        mutationKey: ['mobile-login'],
    });
};