import 'pinia'
import type { AxiosInstance } from "axios";

declare module 'pinia' {
  export interface PiniaCustomProperties {

    // you can define simpler values too
    $http: AxiosInstance | Ref<AxiosInstance>
  }
}