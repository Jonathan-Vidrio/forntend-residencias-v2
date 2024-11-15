import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getApiKey, getAppId, getAuthDomain, getMessagingSenderId, getProjectId, getStorageBucket } from './config';

export const firebaseConfig = {
  apiKey: await getApiKey(),
  authDomain: await getAuthDomain(),
  projectId: await getProjectId(),
  storageBucket: await getStorageBucket(),
  messagingSenderId: await getMessagingSenderId(),
  appId: await getAppId(),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
