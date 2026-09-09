import { useQuery } from "@tanstack/react-query";
import { LedgerItems } from "../types";

type ApiRequest = {
    day: string;
}

type ApiResponse = {
    success: boolean;
    data: LedgerItems | null;
    message?: string;
}

async function fetchDailyLedger({
    day
}: ApiRequest): Promise<ApiResponse> {

    const response = await fetch(`/api/dashboard/daily/${day}`, {
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

export function useGetDailyLedger({
    day
}: ApiRequest) {
    return useQuery({
        queryKey: ['ledger', 'daily', { day }],
        queryFn: () => fetchDailyLedger({ day }),
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