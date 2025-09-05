import { ERROR_MESSAGES } from '@/constants';

export const fetcher = async <T>(url: string, options?: RequestInit): Promise<T> => {
  try {
    const response = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Explorer-App',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      if (response.status === 403) throw new Error(ERROR_MESSAGES.RATE_LIMIT);
      if (response.status === 404) throw new Error(ERROR_MESSAGES.NOT_FOUND);
      throw new Error(ERROR_MESSAGES.GENERIC);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
  }
};
