import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
} from '../services/watchlist.service';

export function useWatchlist() {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['watchlist'],
        queryFn: getWatchlist,
    });

    const addMutation = useMutation({
        mutationFn: addToWatchlist,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watchlist'] }),
    });

    const removeMutation = useMutation({
        mutationFn: removeFromWatchlist,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['watchlist'] }),
    });

    return {
        watchlist: query.data ?? [],
        isLoading: query.isLoading,
        error: query.error,

        addCoin: addMutation.mutate,
        isAdding: addMutation.isPending,
        addError: addMutation.error,

        removeCoin: removeMutation.mutate,
        isRemoving: removeMutation.isPending,
    };
}
