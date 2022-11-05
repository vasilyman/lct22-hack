<template>
  <div
    class="py-1 px-2 border rounded-md flex items-center"
    :class="{
      'border-primary bg-primary/20 font-bold': props.color === 'primary',
      'border-gray bg-gray/20 font-bold ': props.color === 'white',
      'border-success bg-success/20 font-bold ': props.color === 'success',
      'border-warning bg-warning/20 font-bold ': props.color === 'warning',
      'border-danger bg-danger/20 font-bold ': props.color === 'danger',
      'border-info bg-info/20 font-bold ': props.color === 'info',
      'cursor-pointer': props.clickable,
    }"
  >
    <slot />
    <div
      v-if="props.clearable"
      class="text-center ml-2 hover:text-danger cursor-pointer transition-colors duration-100"
      @click="onClear"
    >
      <i class="fas fa-close"></i>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import { TThemeColor } from '@/types/TThemeColor';

const props = defineProps({
  color: { type: String as PropType<TThemeColor>, default: 'white' },
  clearable: { type: Boolean },
  clickable: { type: Boolean },
});

interface Emits {
  (e: 'clear'): void,
}

const emit = defineEmits<Emits>();

const onClear = () => {
  emit('clear');
};
</script>