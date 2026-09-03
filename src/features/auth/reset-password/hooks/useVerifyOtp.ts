import { useMutation, useQueryClient } from '@tanstack/react-query';

type ApiRequest = {
    userId: string;
    identifier: string;
    value: string;
}

type ApiResponse = {
    success: boolean;
    data: {
        token: string
    } | null;
    message?: string | null;
}

const rpVerifyOtp = async (formData: ApiRequest): Promise<ApiResponse> => {
    const response = await fetch('/api/auth/reset-password/verify-otp', {
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

export const useRPVerifyOTP = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, ApiRequest>({
        mutationFn: rpVerifyOtp,
        onSuccess: (data) => {
        },
        onError: (error) => {

        },
        mutationKey: ['rp-verify-otp'],
    });
};