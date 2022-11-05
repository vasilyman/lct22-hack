<template>
  <div
    class="toggle"
    @click="localValue = !localValue"
  >
    <div class="toggle__slider">
      <div
        class="toggle__racer"
        :class="{
          'toggle__racer_active': localValue,
          'toggle__racer_theme-switcher': themeSwitcher,
        }"
      >
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: Boolean, required: true },
  themeSwitcher: { type: Boolean },
});

interface Emits {
  (e: 'update:modelValue', value: boolean): void,
}
const emit = defineEmits<Emits>();

const localValue = computed({
  get() {
    return props.modelValue
  },
  set(val) {
    emit('update:modelValue', val);
  }
})
</script>
<style lang="postcss">
.toggle {
  --toggle-width: 3.125rem;
  @apply cursor-pointer;

  &__slider {
    @apply dark:bg-grayDarkContent bg-gray rounded-full relative;

    height: 1.75rem;
    width: var(--toggle-width);
  }

  &__racer {
    @apply dark:bg-white bg-grayDark rounded-full absolute transition-all duration-300;

    height: 1.125rem;
    width: 1.125rem;
    left: calc(100% - 0.875rem);
    top: 50%;
    transform: translate(-50%, -50%);

    &.toggle__racer_active {
      left: calc(50% - 0.75rem);
    }

    &_theme-switcher {
      @apply bg-opacity-0 dark:bg-opacity-0;
      background-image: url('@/assets/img/luna.png');

      &.toggle__racer_active {
        background-image: url('@/assets/img/sun.png');
      }
    }
  }
}
</style>