<template>
  <button
    class="button"
    :class="{
      'button__color_transparent': props.color === 'transparent',
      'button__color_white': props.color === 'white',
      'button__color_primary': props.color === 'primary',
      'button__color_success': props.color === 'success',
      'button__color_info': props.color === 'info',
      'button__style_outlined': props.outlined,
      'button__size_small': props.small,
      'button__size_large': props.large,
    }"
    @click="onClick"
  >
    <slot />
  </button>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import { TThemeColor } from '@/types/TThemeColor';

const props = defineProps({
  large: { type: Boolean },
  to: { type: [String, Object], default: '' },
  color: { type: String as PropType<TThemeColor | 'transparent' | 'gray'>, default: 'primary' },
  outlined: { type: Boolean },
  small: { type: Boolean },
});

const router = useRouter();

const onClick = (e: Event) => {
  e.preventDefault();  

  if (props.to ) {
    router.push(props.to).catch((e) => {
      console.log(e);
    });
  }
};

const color = props.color || 'primary';
</script>
<style lang="postcss">
.button {
  @apply hover:shadow-lg transition-shadow duration-300 flex items-center justify-center lg:px-6 py-2 px-4 rounded-lg;

  &__size {
    &_large {
      @apply lg:px-6 py-2 px-4 rounded-xl;
    }
    &_small {
      @apply text-sm lg:px-6 py-1 px-4 rounded-md;
    }
  }

  &:not(&__style_outlined)&__color {
    &_white {
      @apply bg-white text-gray3 hover:shadow-white/20;
    }
    &_primary {
      @apply bg-primary text-white hover:shadow-primary/20;
    }
    &_transparent {
      @apply bg-none hover:shadow-md hover:shadow-gray2/20 dark:hover:shadow-white/10;
    }
    &_success {
      @apply bg-primary text-white hover:shadow-success/20;
    }
    &_info {
      @apply bg-none hover:shadow-info/20;
    }
    &_gray {
      @apply bg-gray text-white;
    }
  }

  &__style {
    &_outlined {
      &.button__color {
        &_white {
          @apply bg-none text-gray2 dark:text-white hover:shadow-gray2/20 dark:hover:shadow-white/20 border border-gray2 dark:border-white;
        }
        &_primary {
          @apply bg-none text-primary dark:text-white hover:shadow-primary/20 border border-primary;
        }
        &_success {
          @apply bg-none text-success hover:shadow-success/20 border border-success;
        }
        &_info {
          @apply bg-none text-info hover:shadow-info/20 border border-info;
        }
      }
    }
  }
}
</style>