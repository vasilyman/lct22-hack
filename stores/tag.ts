import { defineStore } from 'pinia';
import TTag, { Tag } from '@/types/TTag';
import tagService from '@/services/tagService';

interface TTagStore {
  tag: TTag | null,
  tagList: TTag[],
}

export const useTagStore = defineStore('tag', {
  state: (): TTagStore => ({
    tag: null,
    tagList: [],
  }),
  actions: {
    fetchItem(codeId: string, signal?: AbortSignal) {
      return tagService.get(this.$http)(codeId, signal)
        .then((res) => {          
          return res.data;
        });
    },
    fetchList(query: {}, signal?: AbortSignal): Promise<TTag[]> {
      return tagService.getList(this.$http)(query, signal)
        .then((res) => { 
          return res.data.map((item) => new Tag(item));
        });
    },
    create(data: TTag, signal?: AbortSignal) {
      return tagService.create(this.$http)(data, signal)
        .then((res) => {          
          return res.data;
        });
    },
  },
});
