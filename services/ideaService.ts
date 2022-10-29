import TIdeaCard from "@/types/TIdeaCard";
import TIdeaCardList from "@/types/TIdeaCardList";
import TQueryIdeaList from '@/types/TQueryIdeaList';
import type { AxiosInstance, AxiosResponse } from "axios";
import projectList from '@/dummy/projectsList.json';

class IdeaService {
  get(http: AxiosInstance) {
    return (codeId: string, signal?: AbortSignal): Promise<AxiosResponse<TIdeaCard>> => Promise.resolve({
      data: projectList.find((item) => item.codeId === codeId) as TIdeaCard,
      status: 200,
      statusText: '',
      headers: {},
      config: {},
    });

    // return (codeId: string): Promise<AxiosResponse<TIdeaCard>> => http({
    //   method: 'get',
    //   url: 'node/get-by-code',
    //   params: {
    //     codeId,
    //   },
    // });
  }

  getList(http: AxiosInstance) {
    return (params?: TQueryIdeaList, signal?: AbortSignal): Promise<AxiosResponse<TIdeaCardList>> => Promise.resolve({
      data: {
        items: projectList as TIdeaCard[],
      },
      status: 200,
      statusText: '',
      headers: {},
      config: {},
    });

    // return (params?: TQueryIdeaList, signal?: AbortSignal): Promise<AxiosResponse<TIdeaCardList>> => http({
    //   method: 'post',
    //   url: 'idea/list',
    //   params,
    //   signal,
    // });
  }
}

export default new IdeaService();
