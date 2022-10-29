/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PiniaPluginContext, Pinia } from "pinia";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const $pinia: Pinia = nuxtApp.$pinia as Pinia;

  const baseUrl = config.public.apiUrl || '';

  const http = axios.create();

  const $http = <T>(params: AxiosRequestConfig): Promise<AxiosResponse<T>> => {

    params.baseURL = baseUrl;

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
