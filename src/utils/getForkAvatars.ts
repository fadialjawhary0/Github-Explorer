import { githubService } from '@/services/githubService';

export interface ForkAvatar {
  id: number;
  username: string;
  avatarUrl: string;
  profileUrl: string;
  createdAt: string;
}

export const getForkAvatars = async (owner: string, repo: string): Promise<ForkAvatar[]> => {
  try {
    const forks = await githubService.getRepositoryForks(owner, repo);

    return forks.map(fork => ({
      id: fork.id,
      username: fork.owner.login,
      avatarUrl: fork.owner.avatar_url,
      profileUrl: fork.owner.html_url,
      createdAt: fork.created_at,
    }));
  } catch (error) {
    console.warn('Failed to get fork avatars:', error);
    return [];
  }
};
