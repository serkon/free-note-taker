'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';

export const useBlocks = (pageId: string) => {
  return useQuery({
    queryKey: ['blocks', pageId],
    queryFn: () => api.blocks.listByPage(pageId).then((res) => res.data),
    enabled: !!pageId,
  });
};

export const useCreateBlock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => api.blocks.create(data).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['blocks', variables.pageId],
      });
    },
  });
};

export const useUpdateBlock = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.blocks.update(id, data).then((res) => res.data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['blocks'],
      });
    },
  });
};
