import React from 'react';
import { Github, User } from 'lucide-react';
import { SEARCH_TYPES } from '@/constants';

interface EmptyStateProps {
  type: typeof SEARCH_TYPES.REPOSITORIES | typeof SEARCH_TYPES.USERS;
}

const EmptyState: React.FC<EmptyStateProps> = ({ type }) => {
  const isRepositories = type === SEARCH_TYPES?.REPOSITORIES;

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        {isRepositories ? <Github className="h-12 w-12 text-muted-foreground" /> : <User className="h-12 w-12 text-muted-foreground" />}
      </div>

      <h3 className="mb-2 text-lg font-semibold text-foreground">No {type} found</h3>

      <p className="text-sm text-muted-foreground">Try adjusting your search terms or browse popular {type}</p>
    </div>
  );
};

export default EmptyState;
