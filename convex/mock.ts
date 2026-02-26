export const useQuery = (query: any, args?: any): any => {
  return undefined;
};

export const usePaginatedQuery = (query: any, args?: any, options?: any) => {
  return {
    results: [] as any[],
    loadMore: (...args: any[]) => {},
    status: "CanLoadMore" as
      | "CanLoadMore"
      | "LoadingFirstPage"
      | "LoadingMore"
      | "Exhausted",
    isLoading: false,
  };
};

export const useMutation = (mutation: any) => {
  return async (...args: any[]): Promise<any> => {};
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
  return async (...args: any[]): Promise<any> => ({});
};

export const useStorage = () => {
  return {
    getUrl: async () => undefined,
    upload: async () => ({ storageId: "mock" }),
  };
};

export const useConvex = () => {
  return {
    client: {},
    query: async (...args: any[]): Promise<any> => undefined,
    mutation: async (...args: any[]): Promise<any> => undefined,
    action: async (...args: any[]): Promise<any> => undefined,
  };
};

export class ConvexError extends Error {
  data: any;
  constructor(messageOrData: string | Record<string, any>) {
    super(
      typeof messageOrData === "string"
        ? messageOrData
        : JSON.stringify(messageOrData),
    );
    this.name = "ConvexError";
    this.data =
      typeof messageOrData === "string"
        ? { message: messageOrData }
        : messageOrData;
  }
}

export const ConvexReactClient = class {
  constructor(url: string) {}
};

export const ConvexProvider = ({ children }: { children: any }) => children;

// Create a comprehensive validator mock that supports any method call
const validatorHandler: ProxyHandler<any> = {
  get: (_target: any, prop: string) => {
    return (...args: any[]) => ({}) as any;
  },
};

export const v: any = new Proxy({}, validatorHandler);

export const mutation = (config: any) => config;
export const query = (config: any) => config;
export const action = (config: any) => config;
export const internalMutation = (config: any) => config;
export const internalQuery = (config: any) => config;
export const internalAction = (config: any) => config;

export const useMockAuth = () => {
  return {
    user: { name: "Demo User", email: "demo@example.com" } as any,
    loading: false,
  };
};
