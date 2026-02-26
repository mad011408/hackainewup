export { ConvexProvider, useMockAuth } from "./mock";
export const useQuery = (query: any, args?: any): any => undefined;
export const usePaginatedQuery = (query: any, args?: any, options?: any) => ({
  results: [] as any[],
  loadMore: () => {},
  status: "CanLoadMore" as string,
  isLoading: false,
});
export const useMutation =
  (mutation: any) =>
  async (...args: any[]): Promise<any> => {};
export const useConvexUser = () => ({
  tokenIdentifier: "mock",
  email: "demo@example.com",
  name: "Demo User",
});
export const useAction =
  (action: any) =>
  async (...args: any[]): Promise<any> => ({});
export const useStorage = () => ({
  getUrl: async () => undefined,
  upload: async () => ({ storageId: "mock" }),
});
export const ConvexReactClient = class {
  constructor() {}
};
