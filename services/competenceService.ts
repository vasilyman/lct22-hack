import TCompetence from "@/types/TCompetence";
import type { AxiosInstance, AxiosResponse } from "axios";

class CompetenceService {
  get(http: AxiosInstance) {
    return (codeId: string, signal?: AbortSignal): Promise<AxiosResponse<TCompetence>> => http({
      method: 'post',
      url: 'competence/getbyid',
      data: {
        id: codeId,
      }
    });
  }

  getList(http: AxiosInstance) {
    return (data?: any, signal?: AbortSignal): Promise<AxiosResponse<TCompetence[]>> => http({
      method: 'post',
      url: 'competence/getall',
      data,
      signal,
    });
  }

  create(http: AxiosInstance) {
    return (data: TCompetence, signal?: AbortSignal): Promise<AxiosResponse<string>> => http({
      method: 'post',
      url: 'competence/create',
      data: {
        title: data.title,
      },
      signal,
    });
  }
}

export default new CompetenceService();
