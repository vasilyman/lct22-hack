<template>
  <div class="flex gap-3 justify-between flex-wrap">
    <div class="w-full lg:w-auto flex-1">
      <div
        class="font-bold cursor-pointer"
        @click="onOpen"
      >{{ title }}</div>
      <div class="text-sm text-gray2">{{ createdAt }}</div>
    </div>
    <div class="w-full lg:w-auto text-right mt-1 flex-1">
      <div class="flex justify-end mb-1">
        <div
          v-for="(item, i) in Array(progress).fill(1)" :key="i"
          class="lg:w-6 lg:h-8 w-2 h-4 lg:rounded rounded-sm border-gray lg:border-2 border mr-1"
          :class="{
            'bg-success': progress >= 5,
            'bg-warning':  progress < 5,
          }"
        ></div>
        <div
          v-for="(item, i) in Array(10 - progress).fill(1)" :key="i"
          class="lg:w-6 lg:h-8 w-2 h-4 lg:rounded rounded-sm border-gray lg:border-2 border mr-1"
        ></div>
      </div>
      <div class="text-sm text-gray2">{{ projectWithStatus.status?.title }}</div>
      <div class="">
        <span class="text-xl font-black mr-1">{{ projectWithStatus.rating }}</span>
        <i class="fas fa-arrow-trend-up text-success"></i>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TIdeaCard from '~~/types/TIdeaCard';
import { PropType } from 'vue';
import ellipsis from '~~/utils/ellipsis';

const props = defineProps({
  project: { type: Object as PropType<TIdeaCard>, required: true },
});

interface Emits {
  (e: 'open'): void,
}
const emit = defineEmits<Emits>();

const projectWithStatus = computed<TIdeaCard>(() => {
  return {
    codeId: props.project.codeId,
    title: props.project.title,
    description: props.project.description,
    createdAt: props.project.createdAt,
    status: props.project.status,
    rating: props.project.rating,
  };
});

const { $dayjs } = useNuxtApp();

const createdAt = $dayjs(projectWithStatus.value.createdAt).fromNow();

const progress = computed<number>(() => {
  return Math.round((projectWithStatus.value.status?.progress ?? 0) * 10)
});

const title = ellipsis(projectWithStatus.value.title, 50);

const onOpen = () => {
  emit('open');
};
</script>