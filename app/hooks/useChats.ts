"use client";

export const useChats = (shouldFetch = true) => {
  // Return mock data when Convex is not available
  return {
    results: [],
    loadMore: () => {},
    status: "loadMore" as const,
    isLoading: false,
  };
};

export const usePinChat = () => async () => {};
export const useUnpinChat = () => async () => {};
