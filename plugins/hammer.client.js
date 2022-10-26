import * as Hammer from 'hammerjs';

export default defineNuxtPlugin((NuxtApp) => {
  return {
    provide: {
      Hammer,
    }
  }
});
