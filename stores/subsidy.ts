import { defineStore } from 'pinia';
import TSubsidy, { Subsidy } from '@/types/TSubsidy';
import subsidyService from '@/services/subsidyService';

interface TSubsidyStore {
  subsidy: TSubsidy | null,
  subsidyList: TSubsidy[],
}

export const useSubsidyStore = defineStore('subsidy', {
  state: (): TSubsidyStore => ({
    subsidy: null,
    subsidyList: [],
  }),
  actions: {
    fetchSubsidy(codeId: string, signal?: AbortSignal) {
      return subsidyService.get(this.$http)(codeId, signal)
        .then((res) => {          
          return res.data;
        });
    },
    fetchSubsidyList(query: {}, signal?: AbortSignal): Promise<TSubsidy[]> {
      return subsidyService.getList(this.$http)(query, signal)
        .then((res) => { 
          return res.data.map((item) => new Subsidy(item));
        });
    },
    createSubsidy(subsidy: TSubsidy, signal?: AbortSignal) {
      return subsidyService.create(this.$http)(subsidy, signal)
        .then((res) => {          
          return res.data;
        });
    },
  },
});
