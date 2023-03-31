import type { UseFetchOptions } from "#app";
import { useFetch } from '#imports';

const isDev = process.env.NODE_ENV !== 'production';

export const useApiData = <DataT>(url: string, opts: UseFetchOptions<DataT> = {}) => {

  const config = useRuntimeConfig();

  const baseURL = config.public.apiUrl;

  const options: UseFetchOptions<DataT> = {
    ...opts,
    baseURL,
  };

  return useFetch(url, options);
};
