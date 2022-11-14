/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PiniaPluginContext, Pinia } from "pinia";
import axios, { AxiosProgressEvent, AxiosRequestConfig, AxiosResponse } from "axios";

const isDev = 0 && process.env.NODE_ENV !== 'production';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  
  const $pinia: Pinia = nuxtApp.$pinia as Pinia;

  const baseURL = isDev ? 'http://localhost:8888/api/v1/' : config.public.apiUrl;

  const http = axios.create({
    baseURL,
  });

  const isLoading = ref(false);

  const $http = <T>(params: AxiosRequestConfig): Promise<AxiosResponse<T>> => {

    params.baseURL = baseURL;

    const token = useCookie('token');
    if (token.value) {
      params.headers = {
        authorization: `Bearer ${ token.value }`,
        ...params.headers,
      };
    }

    isLoading.value = true;

    return http.request(params)
      .finally(() => {
        isLoading.value = false;
      });
  };

  $pinia.use(({ store }: PiniaPluginContext) => {
    store.$http = $http;
  });

  return {
    provide: {
      http,
      isLoading,
    },
  };
});
