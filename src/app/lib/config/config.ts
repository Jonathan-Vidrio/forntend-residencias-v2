'use server';

export const getHostUrl = async (): Promise<string> => process.env.HOST_URL || 'localhost';

export const getSecretKey = async (): Promise<string> => process.env.SECRET_KEY || 'secret';

// Firebase
export const getApiKey = async (): Promise<string> => process.env.API_KEY || 'api_key';
export const getAuthDomain = async (): Promise<string> => process.env.AUTH_DOMAIN || 'auth_domain';
export const getProjectId = async (): Promise<string> => process.env.PROJECT_ID || 'project_id';
export const getStorageBucket = async (): Promise<string> => process.env.STORAGE_BUCKET || 'storage_bucket';
export const getMessagingSenderId = async (): Promise<string> => process.env.MESSAGING_SENDER_ID || 'messaging_sender_id';
export const getAppId = async (): Promise<string> => process.env.APP_ID || 'app_id';
