import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
    getAlerts,
    createAlert,
    updateAlert,
    deleteAlert,
} from '../services/alerts.service';
import { UpdateAlertRequest } from '../types/alert.types';

export function useAlerts() {
    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['alerts'],
        queryFn: getAlerts,
    });

    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: ['alerts'] });

    const createMutation = useMutation({
        mutationFn: createAlert,
        onSuccess: invalidate,
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: UpdateAlertRequest }) =>
            updateAlert(id, data),
        onSuccess: invalidate,
    });

    const deleteMutation = useMutation({
        mutationFn: deleteAlert,
        onSuccess: invalidate,
    });

    return {
        alerts: query.data ?? [],
        isLoading: query.isLoading,
        error: query.error,

        createAlert: createMutation.mutate,
        isCreating: createMutation.isPending,
        createError: createMutation.error,

        updateAlert: updateMutation.mutate,
        deleteAlert: deleteMutation.mutate,
    };
}
