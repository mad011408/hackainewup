export { ConvexProvider } from "./mock";
export const useQuery = (query: any, args?: any) => undefined;
export const usePaginatedQuery = (query: any, args?: any, options?: any) => ({
  results: [],
  loadMore: () => {},
  status: "loadMore",
  isLoading: false,
});
export const useMutation = (mutation: any) => async () => {};
export const useConvexUser = () => ({ tokenIdentifier: "mock", email: "demo@example.com", name: "Demo User" });
export const useAction = (action: any) => async () => ({});
export const useStorage = () => ({ getUrl: async () => undefined, upload: async () => ({ storageId: "mock" }) });
export const ConvexReactClient = class { constructor() {} };
