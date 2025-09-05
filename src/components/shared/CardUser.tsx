import React from 'react';
import { GitHubUser } from '@/types/github/index';
import { ExternalLink, User } from 'lucide-react';

interface CardUserProps {
  user: GitHubUser;
}

const CardUser: React.FC<CardUserProps> = ({ user }) => {
  return (
    <div className="group rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/30 hover:bg-card-hover hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <img src={user?.avatar_url} alt={user?.login} className="h-16 w-16 rounded-full border-2 border-border" />

        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-foreground truncate">{user?.login}</h3>

          <a href={user?.html_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-primary hover:underline">
            View Profile
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default CardUser;
