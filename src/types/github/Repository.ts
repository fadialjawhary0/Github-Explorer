export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  forks_count: number;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  updated_at: string;
  topics: string[];
  license?: {
    name: string;
  };
}
