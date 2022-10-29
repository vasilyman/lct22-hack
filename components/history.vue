<template>
  <div class="history">
    <div
      v-for="item in historyLocal"
      :key="item.codeId"
      class="flex w-full"
    >
      <AtomsMediaObject :media="item.media" class="flex-grow"/>
      <div class="flex-shrink flex items-center history__item-vline">
        <div>
          <div class="w-6 h-6 bg-white border-4 border-success rounded-full" />
        </div>
        <div class="text-sm text-gray2 hidden sm:block ml-2">{{ item.createdAt }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TMediaObject from '@/types/TMediaObject';
import { PropType } from 'vue';

const props = defineProps({
  history: { type: Array as PropType<TMediaObject[]>, default: () => ({}) },
});

interface THistory {
  codeId: string,
  media: TMediaObject,
  createdAt?: string,
}

const { $dayjs } = useNuxtApp();

const historyLocal: THistory[] = props.history.map((item: TMediaObject) => ({
  codeId: item.codeId,
  media: {
    codeId: item.codeId,
    author: item.author,
    message: item.message,
  },
  createdAt: $dayjs(item.createdAt).format('DD MMM YYYY'),
}));
</script>
<style lang="postcss">
.history {
  max-height: 400px;

  @apply overflow-auto;
}
.history__item-vline {
  @apply relative z-0 sm:w-32 w-8;

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: calc(0.75rem - 1px);
    width: 2px;
    height: 100%;
    @apply bg-gray2 -z-10;
  }
}
</style>