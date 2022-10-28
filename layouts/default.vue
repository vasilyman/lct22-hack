<template>
  <div class="text-gray3 dark:text-white dark:bg-grayDark min-h-screen flex flex-col" data-mode="dark">
    <div class="py-3 px-3 lg:py-10 lg:px-20 ">
      <Header v-model:dark="dark" />
    </div>
    <NuxtPage class="py-3 px-3 lg:py-10 lg:px-20" />
    <!-- <Footer /> -->
  </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
const dark = ref(appStore.dark);

useHead({
  htmlAttrs: {
    class: dark.value ? 'dark' : '',
  },
});

watch(dark, (val) => {
  appStore.toggleDarkMode(val);
  useHead({
    htmlAttrs: {
      class: val ? 'dark' : '',
    },
  });
});

watch(appStore, (val) => {
  dark.value = val.dark;
});

onMounted(() => {
  appStore.init();
});

</script>