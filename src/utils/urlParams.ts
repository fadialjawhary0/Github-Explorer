import { useRouter } from 'next/navigation';

export const updateQueryParams = (
  router: ReturnType<typeof useRouter>,
  params: Partial<{ query: string; type: string; sort: string; order: string; language: string; encoded: string }>
) => {
  const url = new URL(window.location.href);

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
  });

  router.replace(url.toString(), { scroll: false });
};

export const encodeParams = (params: Record<string, string>): string => {
  const jsonString = JSON.stringify(params);
  return btoa(jsonString);
};

export const decodeParams = (encodedString: string): Record<string, string> => {
  const jsonString = atob(encodedString);
  return JSON.parse(jsonString);
};
