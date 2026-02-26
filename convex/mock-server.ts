// Mock for convex/server - provides type-safe stubs for Convex server functions
// Used during Next.js build when Convex backend is not available

export const mutation = (config: any) => config;
export const query = (config: any) => config;
export const action = (config: any) => config;
export const internalMutation = (config: any) => config;
export const internalQuery = (config: any) => config;
export const internalAction = (config: any) => config;
export const httpAction = (config: any) => config;
export const cronJobs = () => ({
  interval: (...args: any[]) => {},
  hourly: (...args: any[]) => {},
  daily: (...args: any[]) => {},
  weekly: (...args: any[]) => {},
  monthly: (...args: any[]) => {},
  cron: (...args: any[]) => {},
  export: () => ({}),
});
export const defineSchema = (...args: any[]) => ({}) as any;
export const defineTable = (...args: any[]) =>
  ({
    index: (...a: any[]) =>
      ({
        index: (...b: any[]) =>
          ({
            index: (...c: any[]) => ({}) as any,
          }) as any,
      }) as any,
    searchIndex: (...a: any[]) => ({}) as any,
  }) as any;
export const defineApp = (...args: any[]) =>
  ({
    use: (...a: any[]) => {},
    install: (...a: any[]) => {},
  }) as any;
export const paginationOptsValidator = {} as any;

// Type exports
export type ActionBuilder<T = any, U = any> = any;
export type HttpActionBuilder = any;
export type MutationBuilder<T = any, U = any> = any;
export type QueryBuilder<T = any, U = any> = any;
export type GenericActionCtx<T = any> = any;
export type GenericMutationCtx<T = any> = any;
export type GenericQueryCtx<T = any> = any;
export type GenericDatabaseReader<T = any> = any;
export type GenericDatabaseWriter<T = any> = any;
export type DataModel = any;
export type ApiFromModules<T = any> = any;
export type FilterApi<T = any, U = any> = any;
export type FunctionReference<T = any, U = any> = any;
