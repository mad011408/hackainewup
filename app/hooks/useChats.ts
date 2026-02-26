"use client";

export const useChats = (shouldFetch = true) => {
  // Return mock data when Convex is not available
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

export const usePinChat =
  () =>
  async (...args: any[]): Promise<any> => {};
export const useUnpinChat =
  () =>
  async (...args: any[]): Promise<any> => {};
