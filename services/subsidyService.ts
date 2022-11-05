import TSubsidy from "@/types/TSubsidy";
import type { AxiosInstance, AxiosResponse } from "axios";

class SubsidyService {
  get(http: AxiosInstance) {
    return (codeId: string, signal?: AbortSignal): Promise<AxiosResponse<TSubsidy>> => http({
      method: 'get',
      url: `project/${ codeId }`,
    });
  }

  getList(http: AxiosInstance) {
    return (data?: any, signal?: AbortSignal): Promise<AxiosResponse<TSubsidy[]>> => http({
      method: 'post',
      url: 'subsidies/getall',
      data,
      signal,
    });
  }

  create(http: AxiosInstance) {
    return (subsidy: TSubsidy, signal?: AbortSignal): Promise<AxiosResponse<string>> => http({
      method: 'post',
      url: 'subsidies/create',
      data: {
        title: subsidy.title,
      },
      signal,
    });
  }
}

export default new SubsidyService();
