import { useQuery } from "@tanstack/react-query";
import { DailyCycleDTO } from "../types";

type ApiRequest = {
    day: string;
}

type ApiResponse = {
    success: boolean;
    data: {
        result: DailyCycleDTO[]
    } | null;
    message?: string;
}

async function fetchDailyCycle({
    day
}: ApiRequest): Promise<ApiResponse> {
    const params = new URLSearchParams({
        day: day.toString(),
    });
    const response = await fetch(`/api/cycle/daily/routine?${params.toString()}`, {
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

export function useGetDailyCycle({
    day
}: ApiRequest) {
    return useQuery({
        queryKey: ['cycle', 'daily', 'routine', { day }],
        queryFn: () => fetchDailyCycle({ day }),
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