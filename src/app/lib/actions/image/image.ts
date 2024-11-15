'use server';

import { storage } from '@/app/lib/config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

export async function uploadImage(file: File, path: string): Promise<string | undefined> {
  if (!file) return undefined;

  const ext = file.name.split('.').pop();
  const storageRef = ref(storage, `images/${path}/${v4()}.${ext}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  // Use the 'state_changed' event to get the snapshot
  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      snapshot => {
        // You can access the snapshot here
        // console.log('Upload progress:', snapshot);
      },
      error => {
        reject(error);
      },
      () => {
        // Get the download URL after the upload is complete
        getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject);
      }
    );
  });
}
