<template>
  <div
    class="line dark:line_dark"
    :class="{
      'line_vertical': vertical
    }"
  ></div>
</template>
<script lang="ts" setup>
const props = defineProps({
  vertical: { type: Boolean },
});
</script>