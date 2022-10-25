<template>
  <div class="flex">
    <div class="flex-1"></div>
    <button
      class=""
    ><strong>{{ props.title }}</strong></button>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: { type: String, default: '' },
});
</script>