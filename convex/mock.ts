export const useQuery = (query: any, args?: any) => {
  return undefined;
};

export const usePaginatedQuery = (query: any, args?: any, options?: any) => {
  return {
    results: [],
    loadMore: () => {},
    status: "loadMore",
    isLoading: false,
  };
};

export const useMutation = (mutation: any) => {
  return async () => {};
};

export const useConvexUser = () => {
  return {
    tokenIdentifier: "mock-token",
    email: "demo@example.com",
    name: "Demo User",
    image: undefined,
  };
};

export const useAction = (action: any) => {
  return async () => ({});
};

export const useStorage = () => {
  return {
    getUrl: async () => undefined,
    upload: async () => ({ storageId: "mock" }),
  };
};

export const useConvex = () => {
  return { client: {} };
};

export class ConvexError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConvexError";
  }
}

export const ConvexReactClient = class {
  constructor(url: string) {}
};

export const ConvexProvider = ({ children }: { children: any }) => children;

export const v = {
  string: () => ({}),
  number: () => ({}),
  boolean: () => ({}),
  id: () => ({}),
  object: () => ({}),
  array: (schema: any) => ({}),
  optional: (schema: any) => ({}),
  union: (...schemas: any[]) => ({}),
  literal: (value: any) => ({}),
};
