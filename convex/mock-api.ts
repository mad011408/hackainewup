export const api: any = {
  chats: {
    getUserChats: () => ({}),
    getChatByIdFromClient: () => ({}),
    pinChat: () => ({}),
    unpinChat: () => ({}),
  },
  messages: {
    getMessagesByChatId: () => ({}),
    branchChat: () => ({}),
  },
  userCustomization: {
    saveUserCustomization: () => ({}),
    getUserCustomization: () => ({}),
    getUserCustomizationForBackend: () => ({}),
  },
  notes: {
    getNotes: () => ({}),
    saveNote: () => ({}),
    deleteNote: () => ({}),
  },
  memories: {
    getMemories: () => ({}),
    saveMemory: () => ({}),
    deleteMemory: () => ({}),
  },
  files: {
    getFiles: () => ({}),
    deleteFile: () => ({}),
  },
  user: {
    getUser: () => ({}),
  },
  chatStreams: {
    setActiveTriggerRunId: () => ({}),
    clearActiveTriggerRunId: () => ({}),
  },
  tempStreams: {
    setTempStream: () => ({}),
    getTempStream: () => ({}),
    deleteTempStream: () => ({}),
  },
  sharedChats: {
    getSharedChat: () => ({}),
    shareChat: () => ({}),
    unshareChat: () => ({}),
    getSharedChatsByUser: () => ({}),
  },
  feedback: {
    saveFeedback: () => ({}),
  },
  fileStorage: {
    getFile: () => ({}),
    deleteFile: () => ({}),
    getFileUploadUrl: () => ({}),
  },
  fileActions: {
    deleteFile: () => ({}),
  },
  localSandbox: {
    createSession: () => ({}),
    getSession: () => ({}),
    executeCode: () => ({}),
    deleteSession: () => ({}),
  },
  rateLimitStatus: {
    getRateLimitStatus: () => ({}),
  },
  extraUsage: {
    getExtraUsage: () => ({}),
  },
  extraUsageActions: {
    purchaseExtraUsage: () => ({}),
  },
  aggregateVersions: {
    getVersion: () => ({}),
  },
  crons: {
    cleanupOldChats: () => ({}),
  },
  userDeletion: {
    deleteUserData: () => ({}),
  },
  s3Actions: {
    uploadFile: () => ({}),
    deleteFile: () => ({}),
  },
  s3Cleanup: {
    cleanupOldFiles: () => ({}),
  },
  s3Utils: {
    getSignedUrl: () => ({}),
  },
  redisPubsub: {
    publish: () => ({}),
    subscribe: () => ({}),
  },
  constants: {
    getConstants: () => ({}),
  },
};
