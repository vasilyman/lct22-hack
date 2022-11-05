<template>
  <div
    class="py-1 px-2 border rounded-md"
    :class="{
      'border-primary bg-primary/20 font-bold cursor-pointer': props.color === 'primary',
      'border-gray bg-gray/20 font-bold cursor-pointer': props.color === 'white',
      'border-success bg-success/20 font-bold cursor-pointer': props.color === 'success',
      'border-warning bg-warning/20 font-bold cursor-pointer': props.color === 'warning',
      'border-danger bg-danger/20 font-bold cursor-pointer': props.color === 'danger',
      'border-info bg-info/20 font-bold cursor-pointer': props.color === 'info',
    }"
  >
    <slot />
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import { TThemeColor } from '@/types/TThemeColor';

const props = defineProps({
  color: { type: String as PropType<TThemeColor>, default: 'white' },
});
</script>