<template>
  <button
    class="hover:shadow-lg transition-shadow duration-300 flex items-center justify-center"
    :class="{
      'lg:px-6 py-2 px-4 rounded-xl': props.large,
      'lg:px-6 py-2 px-4 rounded-lg': !props.large,
      'button__color_transparent': color === 'transparent',
      'button__color_white': color === 'white',
      'button__color_primary': color === 'primary',
      'button__color_success': color === 'success',
      'button__color_info': color === 'info',
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
  color: { type: String as PropType<TThemeColor | 'transparent'>, default: 'primary' }
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
.button__color {
  &_white {
    @apply bg-white text-gray3 hover:shadow-primary/20;
  }
  &_primary {
    @apply bg-primary text-white hover:shadow-primary/20;
  }
  &_transparent {
    @apply bg-none hover:shadow-primary/20;
  }
}
</style>