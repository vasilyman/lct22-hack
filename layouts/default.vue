<template>
  <div class="layout" >
    <div class="py-3 lg:py-10 app__container">
      <Header v-model:dark="dark" />
    </div>
    <NuxtPage class="app__container flex-1" />
    <Footer />
    <div class="layout__modals" />
  </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();

const dark = computed({
  get() {
    return appStore.dark;
  },
  set(val) {
    appStore.toggleDarkMode(val);
    cookieDark.value = val ? 'dark' : 'light';
  }
});

useHead({
  htmlAttrs: {
    class: dark.value ? 'dark' : '',
  },
});

const cookieDark = useCookie('dark');

watch(dark, (val) => {
  useHead({
    htmlAttrs: {
      class: val ? 'dark' : '',
    },
  });
});
</script>
<style lang="postcss">
.layout {
  @apply text-gray3 bg-lightBg dark:text-white dark:bg-grayDark min-h-screen flex flex-col;

  
}
</style>