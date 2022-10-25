<template>
  <div class="bg-coloured py-6 px-7 rounded-lg shadow-lg">
    <div
      v-if="props.title || props.rightAction"
      class="flex justify-between items-center mb-6"
    >
      <div
        v-if="props.title"
      ><strong>{{ props.title }}</strong></div>
      <button class="text-gray2 text-xs">{{ props.rightAction }}</button>
    </div>
    <div class="flex">
      <div class="flex overflow-hidden">
        <div
          v-for="item in props.items"
          class="mr-3"
        >
          <slot :item="item" />
        </div>
      </div>
      <div
        class="flex items-center px-3"
      >
        <button
          class="h-10 w-10 rounded-full bg-gray flex items-center justify-center"
          @click="onNext"
        >
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
import TSlideItem from '~~/types/TSlideItem';

interface Emits {
  (e: 'next'): void,
}
const emit = defineEmits<Emits>();

const props = defineProps({
  title: { type: String, default: '' },
  rightAction: { type: String, default: '' },
  items: { type: Object as PropType<TSlideItem[]>, required: true },
});

const onNext = () => {
  emit('next');
}

</script>