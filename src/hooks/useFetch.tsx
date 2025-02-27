import { useState } from 'react';
import { Result } from 'types/common';

/**
 * const [fetchFn(url, params), isLoading] = useFetch<Item[]>();
 */
export function useFetch<T>(): [
  (url: string, init?: RequestInit) => Promise<Result<T>>,
  boolean
] {
  const [isLoading, setIsLoading] = useState(false);

  async function fetchFn<T>(
    url: string,
    init?: RequestInit
  ): Promise<Result<T>> {
    const defaultErrMsg = 'Помилка отримання даних.';
    try {
      setIsLoading(true);
      const res = await fetch(url, init);
      if (!res.ok) return { error: defaultErrMsg, data: null };
      const resData = await res.json();
      return { data: resData };
    } catch (err: any) {
      const resError = err?.message || defaultErrMsg;
      return { error: resError, data: null };
    } finally {
      setIsLoading(false);
    }
  }

  return [fetchFn, isLoading];
}
