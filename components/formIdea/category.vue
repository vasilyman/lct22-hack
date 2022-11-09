<template>
  <div>
    <h2 class="my-3 text-2xl font-bold">Основные параметры</h2>
    <div
      class="flex flex-col gap-3"
    >
      <AtomsSelect
        label="Требуемые компетенции"
        :items="competenceItems"
        v-model:search="searchCompetence"
        placeholder="Выберите компетенцию"
        clear-after-select
        @select="onSelectCompetence"
      />
      <div class="gap-1 basis-1/2 flex flex-wrap items-start lg:mb-10 mb-5">
        <AtomsChip
          v-for="item in competenceLocal"
          :key="item.codeId"
          :color="item.color"
          clearable
          @clear="onClearCompetence(item.codeId)"
        >
          {{ item.title }}
        </AtomsChip>
      </div>
      <AtomsSelect
        label="Категория"
        :items="categoryItems"
        v-model:search="searchTag"
        placeholder="Выберите категорию"
        clear-after-select
        @select="onSelectTag"
      />
      <div class="gap-1 basis-1/2 flex flex-wrap items-start lg:mb-10 mb-5">
        <AtomsChip
          v-for="item in categoryLocal"
          :key="item.codeId"
          :color="item.color"
          clearable
          @clear="onClearTag(item.codeId)"
        >
          {{ item.title }}
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
import TCompetence from "~~/types/TCompetence";
import { useCompetenceStore } from "~~/stores/competence";

const props = defineProps({
  categories: { type: Array as PropType<TTag[]>, default: () => ([]) },
  competencies: { type: Array as PropType<TCompetence[]>, default: () => ([]) },
});

interface Emits {
  (e: 'update:categories', value: TTag[]): void,
  (e: 'update:competencies', value: TCompetence[]): void,
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
  if (tag) categoryLocal.value.push(tag);
};

const onClearTag = (val: string) => {
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
 * competencies
 */
const competenceLocal = computed<TCompetence[]>({
  get() {
    return props.competencies;
  },
  set(val: TCompetence[]) {
    emit('update:competencies', val);
  },
});

const competencies = ref<TCompetence[]>([]);
const searchCompetence = ref('');

const competenceItems = computed<TListItem[]>(() => {
  return competencies.value
    .map((item: TCompetence) => ({
      value: item.codeId,
      title: item.title,
    }))
    .filter((item) => {
      const r = new RegExp(`.*${ searchCompetence.value }.*`, 'i');
      return r.test(item.title);
    });
});

const competenceStore = useCompetenceStore();

const competenceSync = useAsyncData<TCompetence[]>(async () => {
  const res = await competenceStore.fetchList({});
  return res;
})
  .then(({ data }) => {
    if (!data.value) return;
    competencies.value = data.value;
  });

fetches.push(competenceSync);

const onSelectCompetence = (val: string) => {
  const tag = competencies.value.find((item) => item.codeId === val);
  if (tag) competenceLocal.value.push(tag);
};

const onClearCompetence = (val: string) => {
  const index = competenceLocal.value.findIndex((item) => item.codeId === val);
  if (index !== -1) competenceLocal.value.splice(index, 1);
};

/**
 * fetching
 */
 if (fetches.length > 0) await Promise.allSettled(fetches);
</script>