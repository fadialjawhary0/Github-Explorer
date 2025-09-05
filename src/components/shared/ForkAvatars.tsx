import React, { useState, useEffect } from 'react';
import { GitHubRepository } from '@/types/github/index';
import { getForkAvatars, ForkAvatar } from '@/utils/getForkAvatars';
import { formatDateSimple } from '@/utils/formatDate';
import { Tooltip } from 'react-tooltip';

interface ForkAvatarsProps {
  repository: GitHubRepository;
}

const ForkAvatars: React.FC<ForkAvatarsProps> = ({ repository }) => {
  const [forks, setForks] = useState<ForkAvatar[]>([]);

  useEffect(() => {
    const fetchForks = async () => {
      if (!repository?.forks_count) return;

      try {
        const [owner, repo] = repository?.full_name?.split('/');
        const forkData = await getForkAvatars(owner, repo);
        setForks(forkData);
      } catch (error) {
        console.warn('Failed to fetch forks:', error);
      }
    };

    fetchForks();
  }, [repository?.full_name, repository?.forks_count]);

  if (!repository?.forks_count) return null;

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">Forked by:</span>

      <div className="flex -space-x-2">
        {forks?.slice(0, 3)?.map(fork => (
          <div key={fork?.id}>
            <a
              href={fork?.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-transform hover:scale-110"
              data-tooltip-id={`fork-tooltip-${fork?.id}`}
              data-tooltip-content={`${fork?.username} - Forked ${formatDateSimple(fork?.createdAt)}`}
            >
              <img src={fork?.avatarUrl} alt={fork?.username} className="h-6 w-6 rounded-full border-2 border-background object-cover" />
            </a>
            <Tooltip id={`fork-tooltip-${fork?.id}`} place="top" className="!bg-foreground !text-background !text-xs !rounded-md !px-2 !py-1" />
          </div>
        ))}
      </div>

      {repository?.forks_count > 3 && <span className="text-xs text-muted-foreground">+{repository?.forks_count - 3} more</span>}
    </div>
  );
};

export default ForkAvatars;
