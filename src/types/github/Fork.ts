export interface GitHubFork {
  id: number;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  created_at: string;
}
