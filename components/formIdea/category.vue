<template>
  <div>
    <h2 class="my-3 text-2xl font-bold">Категория</h2>
    <div
      class="flex flex-col gap-3"
    >
      <AtomsSelect
        label="Тематика идеи"
        :items="categoryItems"
        v-model:search="searchTag"
        placeholder="Выберите категорию"
        @select="onSelectTag"
      />
      <div class="gap-1 basis-1/2 flex flex-wrap items-start lg:mb-10 mb-5">
        <AtomsChip
          v-for="tag in categoryLocal"
          :key="tag.codeId"
          :color="tag.color"
          clearable
          @clear="onClear(tag.codeId)"
        >
          {{ tag.title }}
        </AtomsChip>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from "vue";
import TListItem from '@/types/TListItem';
import TTag, { Tag } from '~~/types/TTag';
import { useTagStore } from '@/stores/tag';

const props = defineProps({
  categories: { type: Array as PropType<TTag[]>, default: () => ([]) },
});

interface Emits {
  (e: 'update:categories', value: TTag[]): void,
}

const emit = defineEmits<Emits>();

const categoryLocal = computed<TTag[]>({
  get() {
    return props.categories;
  },
  set(val: TTag[]) {
    emit('update:categories', val);
  },
});

const tags = ref<TTag[]>([]);
const searchTag = ref('');

const onSelectTag = (val: string) => {
  const tag = tags.value.find((item) => item.codeId === val);
  searchTag.value = '';
  if (tag) categoryLocal.value.push(tag);
};

const onClear = (val: string) => {
  const index = categoryLocal.value.findIndex((item) => item.codeId === val);
  if (index !== -1) categoryLocal.value.splice(index, 1);
};

const categoryItems = computed<TListItem[]>(() => {
  return tags.value
    .map((item: TTag) => ({
      value: item.codeId,
      title: item.title,
    }))
    .filter((item) => {
      const r = new RegExp(`.*${ searchTag.value }.*`, 'i');
      return r.test(item.title);
    });
});

const fetches = [];

const tagStore = useTagStore();

const tagsSync = useAsyncData<TTag[]>(async () => {
  const res = await tagStore.fetchList({});
  return res;
})
  .then(({ data }) => {
    if (!data.value) return;
    tags.value = data.value;
  });

fetches.push(tagsSync);

/**
 * fetching
 */
 if (fetches.length > 0) await Promise.allSettled(fetches);
</script>