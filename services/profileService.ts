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
        email: credentials.email,
        password: credentials.password,
      },
      signal,
    });
  }

  get(http: AxiosInstance) {
    return (codeId: string, signal?: AbortSignal): Promise<AxiosResponse<TProfile>> => http({
      method: 'get',
      url: `profiles/${ codeId }`,
      signal,
    });
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

  update(http: AxiosInstance) {
    return (id: string, data: TProfile, signal?: AbortSignal): Promise<AxiosResponse<string>> => http({
      method: 'put',
      url: `profiles/${id}`,
      data,
      signal,
    });
  }
}

export default new IdeaService();
