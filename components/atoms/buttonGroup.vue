<template>
  <div class="button-group">
    <div class="button-group__container">
      <AtomsButton
        v-for="item in props.items" :key="item.value"
        small
        :color="localValue === item.value ? 'primary' : 'transparent'"
        @click="localValue = item.value"
      >
        {{ item.title }}
      </AtomsButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import TSelectItem from '@/types/TSelectItem';

const props = defineProps({
  items: { type: Array as PropType<TSelectItem[]>, default: () => ([])},
  modelValue: { type: [String, Number], required: true },
});

interface Emits {
  (e: 'update:modelValue', value: string | number ): void,
}
const emit = defineEmits<Emits>();

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});
</script>
<style lang="postcss">
.button-group {
  @apply flex;

  &__container {
    @apply flex gap-1 p-1 bg-gray dark:bg-white/10 rounded-lg;
  }
}
</style>