<template>
  <div class="">
    <div class="flex">
      <!-- container -->
      <div ref="container" class="overflow-hidden select-none">
        <div class="flex">
          <div
            v-for="item in props.items"
            ref="slide"
            class="mr-4"
          >
            <slot :item="item" />
          </div>
        </div>
      </div>
      <div
        class="flex items-center px-3"
      >
        <button
          class="h-10 w-10 rounded-full bg-gray dark:text-gray3 flex items-center justify-center"
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
import TSlideItem from '@/types/TSlideItem';

const props = defineProps({
  items: { type: Object as PropType<TSlideItem[]>, required: true },
});

const container = ref<HTMLElement | null>(null);
const slide = ref<HTMLElement[] | null>(null);

const scrollHandler = (e: Event | HammerInput) => {
  if (e instanceof Event) e.preventDefault();
  const containerEl = container.value || {};
  if (!(containerEl instanceof HTMLElement)) return;

  let delta = 1;
  if (e instanceof WheelEvent) {
    delta = (e.deltaX || 1) * (e.deltaY || 1);
    delta = containerEl.scrollLeft + 1 * delta;
  } else if ('velocityX' in e && typeof e.velocityX === 'number') {
    delta = containerEl.scrollLeft + e.velocityX * -20;
  }
  containerEl.scroll({
    left: delta
  });
};

onMounted(() => {
  const containerEl = container.value || {};
  if (containerEl instanceof HTMLElement) {
    containerEl.addEventListener('mousewheel', scrollHandler);
    const hm = new Hammer(containerEl);
    hm.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    hm.on('panleft panright panup pandown tap press', scrollHandler);
  }
});

const onNext = () => {
  const containerEl = container.value || {};
  const slideEl = slide.value?.[0] || {};
  if (containerEl instanceof HTMLElement && slideEl instanceof HTMLElement) {
    const { marginRight } = window.getComputedStyle(slideEl);
    containerEl.scroll({
      left: containerEl.scrollLeft + slideEl.offsetWidth + parseFloat(marginRight),
      behavior: 'smooth',
    });
  }
}

</script>