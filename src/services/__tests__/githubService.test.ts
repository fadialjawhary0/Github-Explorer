import { githubService } from '../githubService';
import { fetcher } from '@/lib/fetcher';

jest.mock('@/lib/fetcher');
const mockFetcher = fetcher as jest.MockedFunction<typeof fetcher>;

describe('GitHubService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchRepositories', () => {
    it('should search repositories with basic query', async () => {
      const mockResponse = {
        items: [
          {
            id: 1,
            name: 'test-repo',
            full_name: 'user/test-repo',
            description: 'Test repository',
            html_url: 'https://github.com/user/test-repo',
            stargazers_count: 100,
            language: 'JavaScript',
            forks_count: 10,
            owner: {
              login: 'user',
              avatar_url: 'https://avatars.githubusercontent.com/u/1',
              html_url: 'https://github.com/user',
            },
            updated_at: '2023-01-01T00:00:00Z',
            topics: ['test', 'javascript'],
          },
        ],
        total_count: 1,
      };

      mockFetcher.mockResolvedValue(mockResponse);

      const params = {
        query: 'test',
        type: 'repositories' as const,
        page: 1,
        per_page: 10,
        exactSearch: false,
        filters: {
          sort: 'stars' as const,
          order: 'desc' as const,
          language: '',
        },
      };

      const result = await githubService.searchRepositories(params);

      expect(mockFetcher).toHaveBeenCalledWith(expect.stringContaining('search/repositories'));
      expect(mockFetcher).toHaveBeenCalledWith(expect.stringContaining('q=test'));
      expect(result).toEqual(mockResponse);
    });

    it('should add language filter when provided', async () => {
      mockFetcher.mockResolvedValue({ items: [], total_count: 0 });

      const params = {
        query: 'react',
        type: 'repositories' as const,
        page: 1,
        per_page: 10,
        exactSearch: false,
        filters: {
          sort: 'stars' as const,
          order: 'desc' as const,
          language: 'TypeScript',
        },
      };

      await githubService.searchRepositories(params);

      expect(mockFetcher).toHaveBeenCalledWith(expect.stringContaining('q=react%20language%3ATypeScript'));
    });

    it('should use exact search when enabled', async () => {
      mockFetcher.mockResolvedValue({ items: [], total_count: 0 });

      const params = {
        query: 'react',
        type: 'repositories' as const,
        page: 1,
        per_page: 10,
        exactSearch: true,
        filters: {
          sort: 'stars' as const,
          order: 'desc' as const,
          language: '',
        },
      };

      await githubService.searchRepositories(params);

      expect(mockFetcher).toHaveBeenCalledWith(expect.stringContaining('q=%22react%22%20in%3Aname'));
    });

    it('should use custom sort and order', async () => {
      mockFetcher.mockResolvedValue({ items: [], total_count: 0 });

      const params = {
        query: 'test',
        type: 'repositories' as const,
        page: 1,
        per_page: 10,
        exactSearch: false,
        filters: {
          sort: 'forks' as const,
          order: 'asc' as const,
          language: '',
        },
      };

      await githubService.searchRepositories(params);

      expect(mockFetcher).toHaveBeenCalledWith(expect.stringContaining('sort=forks&order=asc'));
    });
  });

  describe('searchUsers', () => {
    it('should search users with basic query', async () => {
      const mockResponse = {
        items: [
          {
            id: 1,
            login: 'testuser',
            avatar_url: 'https://avatars.githubusercontent.com/u/1',
            html_url: 'https://github.com/testuser',
            type: 'User',
          },
        ],
        total_count: 1,
      };

      mockFetcher.mockResolvedValue(mockResponse);

      const params = {
        query: 'test',
        type: 'users' as const,
        page: 1,
        per_page: 10,
        exactSearch: false,
      };

      const result = await githubService.searchUsers(params);

      expect(mockFetcher).toHaveBeenCalledWith(expect.stringContaining('search/users'));
      expect(mockFetcher).toHaveBeenCalledWith(expect.stringContaining('q=test'));
      expect(result).toEqual(mockResponse);
    });

    it('should use exact search for users', async () => {
      mockFetcher.mockResolvedValue({ items: [], total_count: 0 });

      const params = {
        query: 'john',
        type: 'users' as const,
        page: 1,
        per_page: 10,
        exactSearch: true,
      };

      await githubService.searchUsers(params);

      expect(mockFetcher).toHaveBeenCalledWith(expect.stringContaining('q=%22john%22%20in%3Aname'));
    });
  });

  describe('getRepositoryForks', () => {
    it('should fetch repository forks', async () => {
      const mockForks = [
        {
          id: 1,
          full_name: 'forker/repo',
          owner: {
            login: 'forker',
            avatar_url: 'https://avatars.githubusercontent.com/u/1',
          },
          created_at: '2023-01-01T00:00:00Z',
        },
        {
          id: 2,
          full_name: 'forker2/repo',
          owner: {
            login: 'forker2',
            avatar_url: 'https://avatars.githubusercontent.com/u/2',
          },
          created_at: '2023-01-02T00:00:00Z',
        },
      ];

      mockFetcher.mockResolvedValue(mockForks);

      const result = await githubService.getRepositoryForks('owner', 'repo');

      expect(mockFetcher).toHaveBeenCalledWith(expect.stringContaining('/repos/owner/repo/forks'));
      expect(result).toHaveLength(2);
      expect(result).toEqual(mockForks);
    });

    it('should limit forks to 3', async () => {
      const mockForks = [
        { id: 1, full_name: 'fork1/repo' },
        { id: 2, full_name: 'fork2/repo' },
        { id: 3, full_name: 'fork3/repo' },
        { id: 4, full_name: 'fork4/repo' },
      ];

      mockFetcher.mockResolvedValue(mockForks);

      const result = await githubService.getRepositoryForks('owner', 'repo');

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ id: 1, full_name: 'fork1/repo' });
    });
  });

  describe('getRepositoryFileExtensions', () => {
    it('should fetch and extract file extensions', async () => {
      const mockContents = [
        { name: 'index.js', type: 'file' },
        { name: 'style.css', type: 'file' },
        { name: 'README.md', type: 'file' },
        { name: 'src', type: 'dir' },
      ];

      mockFetcher.mockResolvedValue(mockContents);

      const result = await githubService.getRepositoryFileExtensions('owner', 'repo');

      expect(mockFetcher).toHaveBeenCalledWith(expect.stringContaining('/repos/owner/repo/contents/'));
      expect(result).toContain('js');
      expect(result).toContain('css');
      expect(result).toContain('md');
    });

    it('should handle errors gracefully', async () => {
      mockFetcher.mockRejectedValue(new Error('API Error'));

      const result = await githubService.getRepositoryFileExtensions('owner', 'repo');

      expect(result).toEqual([]);
    });
  });

  describe('getRepositoryFullFileExtensions', () => {
    it('should fetch full file extensions with deeper traversal', async () => {
      const mockContents = [
        { name: 'index.js', type: 'file' },
        { name: 'src', type: 'dir' },
      ];

      mockFetcher.mockResolvedValueOnce(mockContents).mockResolvedValueOnce([{ name: 'component.tsx', type: 'file' }]);

      const result = await githubService.getRepositoryFullFileExtensions('owner', 'repo');

      expect(result).toContain('js');
      expect(result).toContain('tsx');
    });
  });

  describe('Error Handling', () => {
    it('should handle API errors in searchRepositories', async () => {
      mockFetcher.mockRejectedValue(new Error('API Error'));

      const params = {
        query: 'test',
        type: 'repositories' as const,
        page: 1,
        per_page: 10,
        exactSearch: false,
        filters: {
          sort: 'stars' as const,
          order: 'desc' as const,
          language: '',
        },
      };

      await expect(githubService.searchRepositories(params)).rejects.toThrow('API Error');
    });

    it('should handle API errors in searchUsers', async () => {
      mockFetcher.mockRejectedValue(new Error('API Error'));

      const params = {
        query: 'test',
        type: 'users' as const,
        page: 1,
        per_page: 10,
        exactSearch: false,
      };

      await expect(githubService.searchUsers(params)).rejects.toThrow('API Error');
    });
  });
});
