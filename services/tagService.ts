import TTag from "@/types/TTag";
import type { AxiosInstance, AxiosResponse } from "axios";

class TagService {
  get(http: AxiosInstance) {
    return (codeId: string, signal?: AbortSignal): Promise<AxiosResponse<TTag>> => http({
      method: 'post',
      url: 'tag/getbyid',
      data: {
        id: codeId,
      }
    });
  }

  getList(http: AxiosInstance) {
    return (data?: any, signal?: AbortSignal): Promise<AxiosResponse<TTag[]>> => http({
      method: 'post',
      url: 'tag/getall',
      data,
      signal,
    });
  }

  create(http: AxiosInstance) {
    return (data: TTag, signal?: AbortSignal): Promise<AxiosResponse<string>> => http({
      method: 'post',
      url: 'tag/create',
      data: {
        title: data.title,
      },
      signal,
    });
  }
}

export default new TagService();
