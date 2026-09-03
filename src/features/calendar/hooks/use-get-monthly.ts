import { useQuery } from "@tanstack/react-query";
import { DailyEvent } from "../types";


type ApiRequest = {
    month: number;
    year: number;
}

type ApiResponse = {
    success: boolean;
    data: {
        events: DailyEvent[]
    } | null;
    message?: string;
}

async function fetchMonthlyCalendar({
    month, year
}: ApiRequest): Promise<ApiResponse> {
    const params = new URLSearchParams({
        month: month.toString(),
        year: year.toString(),
    });
    const response = await fetch(`/api/calendar/monthly?${params.toString()}`, {
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

export function useGetMonthlyCalendar({
    month, year
}: ApiRequest) {
    return useQuery({
        queryKey: ['monthly-calendar', { month, year }],
        queryFn: () => fetchMonthlyCalendar({ month, year }),
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