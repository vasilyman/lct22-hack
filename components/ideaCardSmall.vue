<template>
  <div
    class="h-40 w-48 flex flex-col" 
  >
    <div
      class="flex-1 overflow-hidden mb-3"
    >
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.title"
        class="object-cover h-full w-full rounded-md overflow-hidden"
      >
      <div
        v-else
        class="h-full w-full border dark:border-gray2 flex justify-center items-center p-3 text-center rounded-md overflow-hidden"
      >
        Инновационный проект
      </div>
    </div>
    <div class="text-xs">{{ item.title }}</div>
  </div>
</template>
<script lang="ts" setup>
import TSlideItem from '@/types/TSlideItem';
import { PropType } from 'vue';

const props = defineProps({
  item: { type: Object as PropType<TSlideItem>, required: true },
});
</script>