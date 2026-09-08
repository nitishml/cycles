import { useQuery } from "@tanstack/react-query";
import { UserSession } from "../types";

type ApiResponse = {
    success: boolean;
    data: UserSession[] | null;
    message?: string | null;

}
async function fetchUserSessions(): Promise<ApiResponse> {
    const response = await fetch(`/api/auth/session/active`, {
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

export function useGetUserSessions() {
    return useQuery({
        queryKey: ['sessions'],
        queryFn: () => fetchUserSessions(),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
        refetchOnWindowFocus: false,
    });
}