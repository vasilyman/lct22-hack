<template>
  <button
    class="bg-primary text-white"
    :class="{
      'p-4 rounded-xl': props.large,
      'p-3 rounded-lg': !props.large
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