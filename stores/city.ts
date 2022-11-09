import { defineStore } from 'pinia';
import { TCity, City } from '@/types/TCity';
import cityService from '@/services/cityService';

interface TCityStore {
  cities: TCity[],
}

export const useCityStore = defineStore('city', {
  state: (): TCityStore => ({
    cities: [],
  }),
  actions: {
    fetchItem(codeId: string, signal?: AbortSignal) {
      return cityService.get(this.$http)(codeId, signal)
        .then((res) => {          
          return res.data;
        });
    },
    fetchList(query: {}, signal?: AbortSignal): Promise<TCity[]> {
      return cityService.getList(this.$http)(query, signal)
        .then((res) => {
          this.cities = res.data;
          return res.data.map((item) => new City(item));
        });
    },
    create(data: TCity, signal?: AbortSignal) {
      return cityService.create(this.$http)(data, signal)
        .then((res) => {          
          return res.data;
        });
    },
  },
});
