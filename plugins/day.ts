import dayjs from '@/utils/dayjs';

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      dayjs,
    },
  };
});
