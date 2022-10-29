import 'pinia'
import type { AxiosInstance } from "axios";

declare module 'pinia' {
  export interface PiniaCustomProperties {
    // by using a setter we can allow both strings and refs
    set $http(value: AxiosInstance | Ref<AxiosInstance>)
    get $http(): AxiosInstance

    // you can define simpler values too
    simpleNumber: number
  }
}