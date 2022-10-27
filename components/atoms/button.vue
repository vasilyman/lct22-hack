<template>
  <button
    class="bg-primary text-white"
    :class="{
      'lg:px-6 py-2 px-4 rounded-xl': props.large,
      'lg:px-6 py-2 px-4 rounded-lg': !props.large
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