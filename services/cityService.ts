import { TCity } from "@/types/TCity";
import type { AxiosInstance, AxiosResponse } from "axios";
import cities from '@/dummy/city.json';

class CityService {
  get(http: AxiosInstance) {
    return (codeId: string, signal?: AbortSignal): Promise<AxiosResponse<TCity>> => http({
      method: 'post',
      url: 'city/getbyid',
      data: {
        id: codeId,
      }
    });
  }

  getList(http: AxiosInstance) {
    return (data?: any, signal?: AbortSignal): Promise<AxiosResponse<TCity[]>> => Promise.resolve({
      data: cities,
      status: 200,
      statusText: '',
      headers: {},
      config: {}
    });
    // return (data?: any, signal?: AbortSignal): Promise<AxiosResponse<TCity[]>> => http({
    //   method: 'post',
    //   url: 'city/getall',
    //   data,
    //   signal,
    // });
  }

  create(http: AxiosInstance) {
    return (data: TCity, signal?: AbortSignal): Promise<AxiosResponse<string>> => http({
      method: 'post',
      url: 'city/create',
      data: {
        title: data.title,
      },
      signal,
    });
  }
}

export default new CityService();
