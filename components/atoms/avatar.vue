<template>
  <div
    class="h-12 w-12 rounded-md overflow-hidden"
    :class="{
      'h-12 w-12': !small,
      'h-6 w-6': small,
    }"
  >
    <img class="h-full w-full" :src="props.src" :alt="props.alt">
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  src: { type: String, default: '/img/animals.jpeg' },
  alt: { type: String, default: '' },
  small: { type: Boolean },
});


</script>