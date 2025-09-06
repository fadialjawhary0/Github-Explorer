import { encodeParams, decodeParams, updateQueryParams } from '../urlParams';

const mockRouter = {
  replace: jest.fn(),
};

describe('URL Params Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('encodeParams', () => {
    it('should encode params to base64', () => {
      const params = {
        query: 'test search',
        type: 'repositories',
        sort: 'stars',
        order: 'desc',
        language: 'JavaScript',
      };

      const encoded = encodeParams(params);
      const decoded = JSON.parse(atob(encoded));

      expect(decoded).toEqual(params);
    });

    it('should handle empty params', () => {
      const params = {};
      const encoded = encodeParams(params);
      const decoded = JSON.parse(atob(encoded));

      expect(decoded).toEqual({});
    });

    it('should handle special characters', () => {
      const params = {
        query: 'test & special "characters"',
        type: 'repositories',
      };

      const encoded = encodeParams(params);
      const decoded = JSON.parse(atob(encoded));

      expect(decoded).toEqual(params);
    });
  });

  describe('decodeParams', () => {
    it('should decode base64 params', () => {
      const params = {
        query: 'test search',
        type: 'repositories',
        sort: 'stars',
      };

      const encoded = btoa(JSON.stringify(params));
      const decoded = decodeParams(encoded);

      expect(decoded).toEqual(params);
    });

    it('should handle empty encoded string', () => {
      const params = {};
      const encoded = btoa(JSON.stringify(params));
      const decoded = decodeParams(encoded);

      expect(decoded).toEqual({});
    });

    it('should throw error for invalid base64', () => {
      expect(() => {
        decodeParams('invalid-base64!');
      }).toThrow();
    });
  });

  describe('updateQueryParams', () => {
    it('should update URL with new params', () => {
      updateQueryParams(mockRouter as any, {
        query: 'test',
        type: 'repositories',
      });

      expect(mockRouter.replace).toHaveBeenCalledWith('http://localhost/?query=test&type=repositories', { scroll: false });
    });

    it('should remove params when value is empty', () => {
      updateQueryParams(mockRouter as any, {
        query: '',
        type: 'repositories',
      });

      expect(mockRouter.replace).toHaveBeenCalledWith('http://localhost/?type=repositories', { scroll: false });
    });

    it('should handle undefined values', () => {
      updateQueryParams(mockRouter as any, {
        query: 'test',
        type: undefined as any,
      });

      expect(mockRouter.replace).toHaveBeenCalledWith('http://localhost/?query=test', { scroll: false });
    });

    it('should preserve existing params', () => {
      updateQueryParams(mockRouter as any, {
        query: 'newValue',
      });

      expect(mockRouter.replace).toHaveBeenCalledWith('http://localhost/?query=newValue', { scroll: false });
    });

    it('should handle special characters in params', () => {
      updateQueryParams(mockRouter as any, {
        query: 'test & special',
        encoded: 'encoded+value',
      });

      expect(mockRouter.replace).toHaveBeenCalledWith('http://localhost/?query=test+%26+special&encoded=encoded%2Bvalue', {
        scroll: false,
      });
    });
  });

  describe('Integration', () => {
    it('should encode and decode params correctly', () => {
      const originalParams = {
        query: 'react hooks',
        type: 'repositories',
        sort: 'stars',
        order: 'desc',
        language: 'TypeScript',
      };

      const encoded = encodeParams(originalParams);
      const decoded = decodeParams(encoded);

      expect(decoded).toEqual(originalParams);
    });

    it('should work with updateQueryParams flow', () => {
      const params = {
        query: 'test',
        type: 'repositories',
        sort: 'stars',
        order: 'desc',
        language: 'JavaScript',
      };

      const encoded = encodeParams(params);
      updateQueryParams(mockRouter as any, { encoded });

      expect(mockRouter.replace).toHaveBeenCalledWith(expect.stringContaining('encoded='), { scroll: false });

      const url = mockRouter.replace.mock.calls[0][0];
      const urlObj = new URL(url);
      const encodedParam = urlObj.searchParams.get('encoded');
      const decoded = decodeParams(encodedParam!);

      expect(decoded).toEqual(params);
    });
  });
});
