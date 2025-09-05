import React, { useState, useEffect } from 'react';

import { GitHubRepository } from '@/types/github/index';
import { Star, GitFork, Calendar, ExternalLink, Eye } from 'lucide-react';
import { formatDate } from '@/utils';
import { extractLanguages } from '@/utils';
import { searchStore } from '@/store';

import FileTags from './FileTags';
import ForkAvatars from './ForkAvatars';
import ExtensionsPopup from './ExtensionsPopup';

interface CardRepoProps {
  repository: GitHubRepository;
}

const CardRepo: React.FC<CardRepoProps> = ({ repository }) => {
  const [fileExtensions, setFileExtensions] = useState<string[]>([]);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [fullExtensions, setFullExtensions] = useState<string[]>([]);
  const [loadingFullExtensions, setLoadingFullExtensions] = useState<boolean>(false);

  useEffect(() => {
    const fetchExtensions = async () => {
      if (!repository?.owner?.login || !repository?.name) return;

      try {
        const extensions = await searchStore?.getRepositoryExtensions(repository?.owner?.login, repository?.name);
        setFileExtensions(extensions);
      } catch (error) {
        console.warn('Failed to fetch file extensions:', error);
      }
    };

    fetchExtensions();
  }, [repository?.owner?.login, repository?.name]);

  const handleViewAll = async () => {
    if (!repository?.owner?.login || !repository?.name) return;

    setShowPopup(true);
    setLoadingFullExtensions(true);

    try {
      const extensions = await searchStore?.getRepositoryFullExtensions(repository?.owner?.login, repository?.name);
      setFullExtensions(extensions);
    } catch (error) {
      console.warn('Failed to fetch full extensions:', error);
    } finally {
      setLoadingFullExtensions(false);
    }
  };

  const languages = extractLanguages(fileExtensions);

  return (
    <>
      <div className="group rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:bg-card-hover hover:-translate-y-1">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <a
                href={repository?.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary cursor-pointer group-hover:text-primary transition-colors duration-300 flex items-center gap-2 w-full"
              >
                <h3 className="text-lg font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">{repository?.name}</h3>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <p className="text-sm text-secondary mb-3 line-clamp-2 group-hover:text-foreground transition-colors duration-300">
              {repository?.description || 'No description available'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Language tags with View All button */}
          <div className="space-y-3">
            <FileTags languages={languages} />
            {!!fileExtensions?.length && (
              <button onClick={handleViewAll} className="cursor-pointer flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors">
                <Eye className="h-4 w-4" />
                View All File Types
              </button>
            )}
          </div>

          {/* Stats and metadata */}
          <div className="flex items-center gap-4 text-sm text-secondary">
            <div className="flex items-center gap-1 group-hover:text-foreground transition-colors duration-300">
              <Star className="h-4 w-4" />
              <span>{repository?.stargazers_count?.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-1 group-hover:text-foreground transition-colors duration-300">
              <GitFork className="h-4 w-4" />
              <span>{repository?.forks_count?.toLocaleString()}</span>
            </div>

            <div className="flex items-center gap-1 group-hover:text-foreground transition-colors duration-300">
              <Calendar className="h-4 w-4" />
              <span>Updated {formatDate(repository?.updated_at)}</span>
            </div>
          </div>

          {/* Owner info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={repository?.owner?.avatar_url}
                alt={repository?.owner?.login}
                className="h-6 w-6 rounded-full ring-2 ring-border group-hover:ring-primary/50 transition-all duration-300"
              />
              <a
                href={repository?.owner?.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:text-primary/80 transition-colors duration-300"
              >
                {repository?.owner?.login}
              </a>
            </div>
          </div>

          {/* Fork avatars */}
          <ForkAvatars repository={repository} />
        </div>
      </div>

      {/* Extensions Popup */}
      <ExtensionsPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        extensions={fullExtensions}
        repositoryName={repository?.name || ''}
        loading={loadingFullExtensions}
      />
    </>
  );
};

export default CardRepo;
