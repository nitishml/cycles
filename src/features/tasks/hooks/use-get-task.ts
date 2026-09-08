import { useQuery } from "@tanstack/react-query";
import { TaskDetailsDTO } from "../types";

type ApiRequest = {
    taskId: string
}

type ApiResponse = {
    success: boolean;
    data: TaskDetailsDTO | null;
    message?: string;
}

async function fetchTask({
    taskId,
}: ApiRequest): Promise<ApiResponse> {

    const response = await fetch(`/api/task/manage/${taskId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
}

export function useGetTask({
    taskId,
}: ApiRequest) {
    return useQuery({
        queryKey: ['task', 'manage', taskId,],
        queryFn: () => fetchTask({ taskId, }),
        staleTime: 1000 * 60 * 15,
        gcTime: 1000 * 60 * 10,
        retry: (failureCount, error) => {
            if (error.message.includes('401') || error.message.includes('403')) {
                return false;
            }
            return failureCount < 3;
        },
        refetchOnWindowFocus: false,
    });
}