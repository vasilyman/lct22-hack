import { defineStore } from 'pinia';
import TCompetence, { Competence } from '@/types/TCompetence';
import competenceService from '@/services/competenceService';

interface TCompetenceStore {
  competencies: TCompetence[],
}

export const useCompetenceStore = defineStore('competence', {
  state: (): TCompetenceStore => ({
    competencies: [],
  }),
  actions: {
    fetchItem(codeId: string, signal?: AbortSignal) {
      return competenceService.get(this.$http)(codeId, signal)
        .then((res) => {          
          return res.data;
        });
    },
    fetchList(query: {}, signal?: AbortSignal): Promise<TCompetence[]> {
      return competenceService.getList(this.$http)(query, signal)
        .then((res) => {
          this.competencies = res.data;
          return res.data.map((item) => new Competence(item));
        });
    },
    create(data: TCompetence, signal?: AbortSignal) {
      return competenceService.create(this.$http)(data, signal)
        .then((res) => {          
          return res.data;
        });
    },
  },
});
