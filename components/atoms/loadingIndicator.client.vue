<template>
  <div
    class="loading-indicator loading"
    :class="{
      'loading-indicator_active': active,
    }"
  />
</template>
<script lang="ts" setup>
const props = defineProps({
  progress: { type: Number, default: 0 },
});

const active = ref(false);

const timeoutId = ref<ReturnType<typeof setTimeout> |  number>(0);

const start = () => {
  timeoutId.value = setTimeout(() => {
    active.value = true;
  }, 100);
};

const stop = () => {
  clearTimeout(timeoutId.value);
  active.value = false;
};

watch(() => props.progress, (val) => {
  if (val) {
    start();
  } else {
    stop();
  }
});

onUnmounted(() => {
  stop();
});

</script>
<style lang="postcss">
.loading-indicator {
  @apply h-1 w-full bg-primary absolute top-0 hidden;

  &_active {
    @apply block;
  }
}
</style>