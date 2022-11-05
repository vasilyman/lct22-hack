<template>
  <div
    class="idea-card-small"
    :class="{
      'idea-card-small__size_tiny': tiny,
    }"
  >
    <div
      class="idea-card-small__img"
    >
      <img
        v-if="item.image"
        :src="item.image"
        :alt="item.title"
        class="w-full h-full object-cover rounded-md overflow-hidden"
      >
      <div
        v-else
        class="h-full w-full border dark:border-gray2 flex justify-center items-center p-3 text-center rounded-md overflow-hidden"
      >
        Инновационный проект
      </div>
    </div>
    <div class="text-xs">{{ ellipsis(item.title, 40) }}</div>
  </div>
</template>
<script lang="ts" setup>
import TSlideItem from '@/types/TSlideItem';
import { PropType } from 'vue';
import ellipsis from '~~/utils/ellipsis';

const props = defineProps({
  item: { type: Object as PropType<TSlideItem>, required: true },
  tiny: { type: Boolean },
});
</script>
<style lang="postcss">
.idea-card-small {
  @apply w-48 flex flex-col mr-2;

  &__size {
    &_tiny {
      @apply w-36 mr-5;

      .idea-card-small__img {
        @apply h-24 w-36;
      }
    }
  }

  &__img {
    @apply h-32 w-full overflow-hidden mb-3;
  }
}
</style>