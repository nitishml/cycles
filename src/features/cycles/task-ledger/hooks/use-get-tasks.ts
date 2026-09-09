import { useQuery } from "@tanstack/react-query";
import { TaskListItem } from "../types";

type ApiResponse = {
    success: boolean;
    data: {
        tasks: TaskListItem[]
    } | null;
    message?: string | null;
}

async function fetchTasks(): Promise<ApiResponse> {

    const response = await fetch(`/api/cycle/tasks`, {
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

export function useGetCycleTasks() {
    return useQuery({
        queryKey: ['cycle', 'tasks'],
        queryFn: () => fetchTasks(),
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