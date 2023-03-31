import TIdeaCard from "@/types/TIdeaCard";
import TIdeaCardList from "@/types/TIdeaCardList";
import TQueryIdeaList from '@/types/TQueryIdeaList';
import type { AxiosInstance, AxiosResponse } from "axios";
import projectList from '@/dummy/projectsList.json';
import { TFormIdea } from "~~/types/TFormIdea";
import { TMemberStatus } from "~~/types/TMemberStatus";
import type { UseFetchOptions } from "#app";
import { useFetch, useRuntimeConfig } from "#imports";
import { useApiData } from '~~/app/lib';

class IdeaService {
  get(http: AxiosInstance) {
    return (codeId: string, signal?: AbortSignal): Promise<AxiosResponse<TIdeaCard>> => http({
      method: 'get',
      url: `project/${ codeId }`,
    });
  }

  getList(body: TQueryIdeaList = {}, options?: UseFetchOptions<TIdeaCard[]>) {
    return useApiData(
      'project/getall',
      {
        ...options,
        body,
        method: 'POST',
      },
    );
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

  joinAs(http: AxiosInstance) {
    return (idea: string, user: string, status: TMemberStatus, signal?: AbortSignal): Promise<AxiosResponse<string>> => http({
      method: 'post',
      url: `project/append/${status.toLocaleLowerCase()}`,
      data: {
        user_id: Number(user),
        project_id: Number(idea),
      },
      signal,
    });
  }
}

export default new IdeaService();
