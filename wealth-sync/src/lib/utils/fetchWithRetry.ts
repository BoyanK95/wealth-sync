const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      const response = await fetch(url, options);
      if (response.status === 429) {
        const waitTime = Math.min(1000 * Math.pow(2, retries), 10000);
        await delay(waitTime);
        retries++;
        continue;
      }
      if (!response.ok) {
        throw new Error(`Trading212 API error: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      if (retries === maxRetries - 1) throw error;
      retries++;
      const waitTime = Math.min(1000 * Math.pow(2, retries), 10000);
      await delay(waitTime);
    }
  }
  throw new Error('Max retries reached');
}