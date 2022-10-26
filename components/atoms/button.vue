<template>
  <button
    class="bg-primary text-white"
    :class="{
      'lg:p-4 p-3 rounded-xl': props.large,
      'lg:p-3 p-2 rounded-lg': !props.large
    }"
  >
    <slot />
  </button>
</template>
<script lang="ts" setup>
const props = defineProps({
  large: { type: Boolean },
});
</script>