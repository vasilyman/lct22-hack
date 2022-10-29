import { defineStore } from 'pinia';
import TIdeaCard from '@/types/TIdeaCard';
import ideaService from '@/services/ideaService';
import TQueryIdeaList from '@/types/TQueryIdeaList';
import TIdeaCardList from '@/types/TIdeaCardList';

interface TIdeaStore {
  idea: TIdeaCard | null,
  ideaList: TIdeaCard[],
}

export const useIdeaStore = defineStore('idea', {
  state: (): TIdeaStore => ({
    idea: null,
    ideaList: [],
  }),
  actions: {
    fetchIdea(codeId: string, signal?: AbortSignal) {
      return ideaService.get(this.$http)(codeId, signal)
        .then((res) => {          
          return res.data;
        });
    },
    fetchIdeaList(query: TQueryIdeaList, signal?: AbortSignal): Promise<TIdeaCardList> {
      return ideaService.getList(this.$http)(query, signal)
        .then((res) => {          
          return res.data;
        });
    },
  },
});
