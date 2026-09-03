import { useMutation, useQueryClient } from '@tanstack/react-query';

type ApiRequest = {
    mobile: string;
}

type ApiResponse = {
    success: boolean;
    data: {
        identifier: string;
        id: string;
    } | null
    message?: string | null;
    errorType?: "NO USER" | "NO ACCOUNT" | "INACTIVE" | null
}

const rpVerifyMobile = async (formData: ApiRequest): Promise<ApiResponse> => {
    const response = await fetch('/api/auth/reset-password/verify-mobile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export const useRPVerifyMobile = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, ApiRequest>({
        mutationFn: rpVerifyMobile,
        onSuccess: (data) => {
        },
        onError: (error) => {

        },
        mutationKey: ['rp-verify-mobile'],
    });
};