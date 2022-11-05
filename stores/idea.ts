import { defineStore } from 'pinia';
import TIdeaCard, { IdeaCard } from '@/types/TIdeaCard';
import ideaService from '@/services/ideaService';
import TQueryIdeaList from '@/types/TQueryIdeaList';
import TIdeaCardList from '@/types/TIdeaCardList';
import { TFormIdea } from '~~/types/TFormIdea';

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
    fetchIdeaList(query: TQueryIdeaList, signal?: AbortSignal): Promise<TIdeaCard[]> {
      return ideaService.getList(this.$http)(query, signal)
        .then((res) => {
          return res.data.map((item) => new IdeaCard(item));
        });
    },
    createIdea(idea: TFormIdea, signal?: AbortSignal) {
      return ideaService.create(this.$http)(idea, signal)
        .then((res) => {          
          return res.data;
        });
    },
    updateIdea(idea: TFormIdea, signal?: AbortSignal) {
      return ideaService.update(this.$http)(idea, signal)
        .then((res) => {          
          return res.data;
        });
    },
  },
});
