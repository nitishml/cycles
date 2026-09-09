import { useQuery } from "@tanstack/react-query";
import { RoutineDetailsDTO } from "../types";

type ApiRequest = {
    routineId: string
}

type ApiResponse = {
    success: boolean;
    data: RoutineDetailsDTO | null;
    message?: string;
}

async function fetchRoutine({
    routineId,
}: ApiRequest): Promise<ApiResponse> {

    const response = await fetch(`/api/routine/manage/${routineId}`, {
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

export function useGetRoutine({
    routineId,
}: ApiRequest) {
    return useQuery({
        queryKey: ['routine', 'manage', routineId,],
        queryFn: () => fetchRoutine({ routineId, }),
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