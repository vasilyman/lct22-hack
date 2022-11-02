<template>
  <div class="flex flex-col items-center mr-4">
    <div class="rounded-full h-32 w-32 overflow-hidden mb-1">
      <img
        :src="item.image"
        :alt="item.title"
        class="w-full object-contain"
        draggable="false"
      >
    </div>
    <div class="text-sm text-gray2">{{ item.title }}</div>
    <slot />
  </div>
</template>
<script lang="ts" setup>
import TSlideItem from '@/types/TSlideItem';
import { PropType } from 'vue';

const props = defineProps({
  item: { type: Object as PropType<TSlideItem>, required: true },
});
</script>