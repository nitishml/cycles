import { useMutation, useQueryClient } from '@tanstack/react-query';

type ApiResponse = {
    success: boolean;
    data: {} | null;
    message?: string;
}
type ApiRequest = {
    sessionId: string;
}

const revokeSession = async (formData: ApiRequest): Promise<ApiResponse> => {
    const response = await fetch('/api/auth/session/revoke', {
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

export const useRevokeSession = () => {
    const queryClient = useQueryClient();

    return useMutation<ApiResponse, Error, ApiRequest>({
        mutationFn: revokeSession,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['sessions'] });
            queryClient.invalidateQueries({ queryKey: ['me'] });
        },
        onError: (error) => {
        },
        mutationKey: ['revoke-session'],
    });
};