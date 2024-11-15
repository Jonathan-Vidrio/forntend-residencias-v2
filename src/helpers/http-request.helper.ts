'use server';

import { HttpRequest } from '@/interfaces';
import { ErrorManager } from './error-manager.helper';
import { getHostUrl } from '@/app/lib/config/config';

async function fetchWithTimeout(url: string, options: RequestInit, timeout: number): Promise<Response> {
  let timeoutId: NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(ErrorManager.handleError({ error: 'REQUEST_TIMEOUT', message: 'Request timeout', statusCode: 408 }));
    }, timeout);
  });

  console.log('\n\n---------- Start Fetching ----------');
  console.log('fetching:', url);
  console.log('options:', options);

  const fetchPromise = fetch(url, options).then(response => {
    clearTimeout(timeoutId);
    return response;
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}

export async function httpRequest<T>(parameters: HttpRequest, timeout: number = 20000): Promise<any> {
  const hostUrl = await getHostUrl();

  const { url, method, headers, body } = parameters;

  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetchWithTimeout(hostUrl + url, options, timeout);

    if (!response.ok) {
      throw ErrorManager.handleError(await response.json());
    }

    // print the response body
    const responseBody = await response.clone().text();
    console.log('response:', responseBody);

    return response.json();
  } catch (error: any) {
    console.error('Error fetching:', error.message);
    return Promise.reject(error);
  } finally {
    console.log('----------- End Fetching -----------\n\n');
  }
}
