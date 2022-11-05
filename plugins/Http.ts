/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PiniaPluginContext, Pinia } from "pinia";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const isDev = process.env.NODE_ENV !== 'production';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  
  const $pinia: Pinia = nuxtApp.$pinia as Pinia;

  const baseUrl = isDev ? 'http://localhost:8888/api/v1/' : config.public.apiUrl;

  const http = axios.create();

  const $http = <T>(params: AxiosRequestConfig): Promise<AxiosResponse<T>> => {

    params.baseURL = baseUrl;

    const token = useCookie('token');
    if (token.value) {
      params.headers = {
        authorization: `Bearer ${ token.value }`,
        ...params.headers,
      };
    }

    return http.request(params);
  };

  $pinia.use(({ store }: PiniaPluginContext) => {
    store.$http = $http;
  });

  return {
    provide: {
      http,
    },
  };
});
