'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { Sidebar } from '@/components/Sidebar';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function WorkspacePage() {
  const params = useParams();
  const workspaceId = params.id as string;
  const { setCurrentWorkspace, currentPageId, setCurrentPage } = useWorkspaceStore();
  const [newPageTitle, setNewPageTitle] = useState('');

  useEffect(() => {
    setCurrentWorkspace(workspaceId);
  }, [workspaceId]);

  const { data: pages } = useQuery({
    queryKey: ['pages', workspaceId],
    queryFn: () => api.pages.listByWorkspace(workspaceId).then((res) => res.data),
  });

  const createPageMutation = useMutation({
    mutationFn: () =>
      api.pages.create({
        workspaceId,
        title: newPageTitle || 'Untitled',
        icon: '📄',
      }),
    onSuccess: (response) => {
      setNewPageTitle('');
      setCurrentPage(response.data.id);
    },
  });

  if (!pages) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar
        pages={pages}
        onCreatePage={() => createPageMutation.mutate()}
        onSelectPage={(pageId) => setCurrentPage(pageId)}
      />
      <div className="flex-1 p-8">
        {currentPageId ? (
          <PageEditor pageId={currentPageId} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Create your first page</h2>
              <Button onClick={() => createPageMutation.mutate()}>
                <Plus className="h-4 w-4 mr-2" /> New Page
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PageEditor({ pageId }: { pageId: string }) {
  const { data: page } = useQuery({
    queryKey: ['page', pageId],
    queryFn: () => api.pages.get(pageId).then((res) => res.data),
  });

  const { data: blocks } = useQuery({
    queryKey: ['blocks', pageId],
    queryFn: () => api.blocks.listByPage(pageId).then((res) => res.data),
  });

  if (!page) {
    return <div>Loading page...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          {page.icon} {page.title}
        </h1>
        {page.coverImage && (
          <img
            src={page.coverImage}
            alt="Cover"
            className="w-full h-48 object-cover rounded-lg"
          />
        )}
      </div>
      <div className="space-y-4">
        {blocks?.map((block: any) => (
          <BlockRenderer key={block.id} block={block} />
        ))}
      </div>
    </div>
  );
}

function BlockRenderer({ block }: { block: any }) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="text-2xl font-bold mb-4">
          {block.content.text}
        </h2>
      );
    case 'text':
      return <p className="text-base mb-4">{block.content.text}</p>;
    case 'list':
      return (
        <ul className="list-disc list-inside mb-4">
          {block.content.items?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <div>{block.content.text || JSON.stringify(block.content)}</div>;
  }
}
