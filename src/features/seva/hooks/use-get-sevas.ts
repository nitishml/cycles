import { useQuery } from "@tanstack/react-query";
import { SevaListItem } from "../types";

type ApiResponse = {
    success: boolean;
    data: {
        seva: SevaListItem[]
    } | null;
    message?: string | null;
}

async function fetchSevas(): Promise<ApiResponse> {

    const response = await fetch(`/api/seva`, {
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

export function useGetSevaList() {
    return useQuery({
        queryKey: ['seva'],
        queryFn: () => fetchSevas(),
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