import React from 'react';
import { Search, Github } from 'lucide-react';

const WelcomeState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-6 rounded-full bg-muted p-6">
        <Github className="h-16 w-16 text-primary" />
      </div>
      <h1 className="mb-4 text-3xl font-bold text-foreground">Welcome to GitHub Explorer</h1>
      <p className="mb-6 text-lg text-secondary max-w-2xl">
        Search for repositories and users on GitHub. Start typing in the search bar above to discover amazing projects and developers.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-secondary">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <span>Type to search</span>
        </div>
        <div className="flex items-center gap-2">
          <Github className="h-4 w-4" />
          <span>Browse repositories & users</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeState;
