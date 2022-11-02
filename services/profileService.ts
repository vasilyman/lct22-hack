import TProfile from "@/types/TProfile";
import TProfileList from "@/types/TProfileList";
import TQueryProfileList from '@/types/TQueryProfileList';
import type { AxiosInstance, AxiosResponse } from "axios";
import profileList from '@/dummy/profileList.json';
import TLogin from "@/types/TLogin";

class IdeaService {
  login(http: AxiosInstance) {
    return (credentials: TLogin, signal?: AbortSignal): Promise<AxiosResponse<TLogin>> => http({
      method: 'POST',
      url: '/login',
      data: {
        username: credentials.username,
        password: credentials.password,
      },
    });
  }

  get(http: AxiosInstance) {
    return (id: string, signal?: AbortSignal): Promise<AxiosResponse<TProfile>> => Promise.resolve({
      data: profileList.find((item) => item.id === id) as TProfile,
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
    return (params?: TQueryProfileList, signal?: AbortSignal): Promise<AxiosResponse<TProfileList>> => Promise.resolve({
      data: {
        items: profileList as TProfile[],
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
