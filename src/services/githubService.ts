import { SearchResponse, GitHubRepository, GitHubUser, GitHubFork, SearchParams } from '@/types/github/index';
import { API_BASE_URL, SEARCH_ENDPOINT, SEARCH_TYPES } from '@/constants';
import { fetcher } from '@/lib/fetcher';

interface RepositoryContent {
  name: string;
  path: string;
  type: 'file' | 'dir';
  download_url?: string;
}

class GitHubService {
  private baseURL = API_BASE_URL;

  async searchRepositories(params: SearchParams): Promise<SearchResponse<GitHubRepository>> {
    let baseQuery = params?.query;

    if (params?.filters?.language) baseQuery += ` language:${params?.filters?.language}`;

    const encodedQuery = params?.exactSearch ? encodeURIComponent(`"${baseQuery}" in:name`) : encodeURIComponent(baseQuery);

    const sort = params.filters?.sort || 'stars';
    const order = params.filters?.order || 'desc';

    const endpoint = `${this.baseURL}${SEARCH_ENDPOINT}/repositories?q=${encodedQuery}&page=${params.page}&per_page=${params.per_page}&sort=${sort}&order=${order}`;

    return fetcher<SearchResponse<GitHubRepository>>(endpoint);
  }

  async searchUsers(params: SearchParams): Promise<SearchResponse<GitHubUser>> {
    const baseQuery = encodeURIComponent(params.query);
    const query = params?.exactSearch ? encodeURIComponent(`"${params.query}" in:name`) : baseQuery;

    const endpoint = `${this.baseURL}${SEARCH_ENDPOINT}/users?q=${query}&page=${params.page}&per_page=${params.per_page}&sort=followers&order=desc`;

    return fetcher<SearchResponse<GitHubUser>>(endpoint);
  }

  async getRepositoryForks(owner: string, repo: string, page: number = 1, perPage: number = 3): Promise<GitHubFork[]> {
    const endpoint = `/repos/${owner}/${repo}/forks?page=${page}&per_page=${perPage}&sort=newest`;

    const forks = await fetcher<GitHubFork[]>(`${this.baseURL}${endpoint}`);
    return forks.slice(0, 3);
  }

  async getRepositoryFileExtensions(owner: string, repo: string): Promise<string[]> {
    try {
      const contents = await this.fetchRepositoryContents(owner, repo, '');
      const extensions = new Set<string>();

      await this.extractExtensionsFromContents(owner, repo, contents, extensions, 1);

      return Array.from(extensions).sort();
    } catch (error) {
      console.warn(`Failed to fetch file extensions for ${owner}/${repo}:`, error);
      return [];
    }
  }

  async getRepositoryFullFileExtensions(owner: string, repo: string): Promise<string[]> {
    try {
      const contents = await this.fetchRepositoryContents(owner, repo, '');
      const extensions = new Set<string>();

      await this.extractExtensionsFromContents(owner, repo, contents, extensions, 3);

      return Array.from(extensions).sort();
    } catch (error) {
      console.warn(`Failed to fetch full file extensions for ${owner}/${repo}:`, error);
      return [];
    }
  }

  private async fetchRepositoryContents(owner: string, repo: string, path: string): Promise<RepositoryContent[]> {
    const endpoint = `/repos/${owner}/${repo}/contents/${path}`;
    const contents = await fetcher<RepositoryContent[]>(`${this.baseURL}${endpoint}`);
    return contents;
  }

  private async extractExtensionsFromContents(
    owner: string,
    repo: string,
    contents: RepositoryContent[],
    extensions: Set<string>,
    maxDepth: number = 3,
    currentDepth: number = 0
  ): Promise<void> {
    if (currentDepth >= maxDepth) return;

    for (const item of contents) {
      if (item.type === 'file') {
        const extension = this.getFileExtension(item.name);
        if (extension) {
          extensions.add(extension);
        }
      } else if (item.type === 'dir' && currentDepth < maxDepth - 1) {
        try {
          const subContents = await this.fetchRepositoryContents(owner, repo, item.path);
          await this.extractExtensionsFromContents(owner, repo, subContents, extensions, maxDepth, currentDepth + 1);
        } catch (error) {
          continue;
        }
      }
    }
  }

  private getFileExtension(filename: string): string | null {
    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
      return null;
    }
    return filename.substring(lastDotIndex + 1).toLowerCase();
  }
}

export const githubService = new GitHubService();
export default githubService;
