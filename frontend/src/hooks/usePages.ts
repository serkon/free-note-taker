'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const usePages = (workspaceId: string) => {
  return useQuery({
    queryKey: ['pages', workspaceId],
    queryFn: () => api.pages.listByWorkspace(workspaceId).then((res) => res.data),
    enabled: !!workspaceId,
  });
};

export const usePage = (pageId: string) => {
  return useQuery({
    queryKey: ['page', pageId],
    queryFn: () => api.pages.get(pageId).then((res) => res.data),
    enabled: !!pageId,
  });
};

export const useCreatePage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.pages.create(data).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['pages', variables.workspaceId],
      });
    },
  });
};
