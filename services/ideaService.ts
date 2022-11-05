import TIdeaCard from "@/types/TIdeaCard";
import TIdeaCardList from "@/types/TIdeaCardList";
import TQueryIdeaList from '@/types/TQueryIdeaList';
import type { AxiosInstance, AxiosResponse } from "axios";
import projectList from '@/dummy/projectsList.json';
import { TFormIdea } from "~~/types/TFormIdea";

class IdeaService {
  get(http: AxiosInstance) {
    return (codeId: string, signal?: AbortSignal): Promise<AxiosResponse<TIdeaCard>> => http({
      method: 'get',
      url: `project/${ codeId }`,
    });
  }

  getList(http: AxiosInstance) {
    return (data?: TQueryIdeaList, signal?: AbortSignal): Promise<AxiosResponse<TIdeaCard[]>> => http({
      method: 'post',
      url: 'project/getall',
      data,
      signal,
    });
  }

  create(http: AxiosInstance) {
    return (idea: TFormIdea, signal?: AbortSignal): Promise<AxiosResponse<string>> => http({
      method: 'post',
      url: 'project/create',
      data: idea,
      signal,
    });
  }

  update(http: AxiosInstance) {
    return (data: TFormIdea, signal?: AbortSignal): Promise<AxiosResponse<string>> => http({
      method: 'post',
      url: 'project/update',
      data,
      signal,
    });
  }
}

export default new IdeaService();
