<template>
  <Teleport to=".layout__modals">
    <div
      v-if="open"
      ref="modal"
      class="modal"
    >
      <div
        class="modal__overlay"
        @click="onClickOverlay"
      ></div>
      <div
        ref="content"
        class="modal__content"
      >
        <div class="dark:text-gray mb-4 text-lg" v-if="props.title">
          {{ props.title }}
        </div>
        <slot />
        <div
          class="modal__close"
          @click="onClose"
        >
          <i class="fas fa-close"></i>
        </div>
      </div>
    </div>
  </Teleport>
</template>
<script lang="ts" setup>
import anime from 'animejs/lib/anime.es.js';

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: { type: String },
});

interface Emits {
  (e: 'update:modelValue', value: boolean ): void,
}
const emit = defineEmits<Emits>();

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});

const modal = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);

const open = ref(localValue.value);

watch(localValue, (val) => {
  if (val) open.value = val;
  
  nextTick(() => {
    const modalEl = modal.value;
    const contentEl = content.value;
    try {
      document.body.style.overflow = val ? 'hidden' : '';
    } catch (error) {
      
    }

    if (modalEl && contentEl) {
      if (val) {
        anime({
          targets: modalEl,
          opacity: 1,
          duration: 200,
          easing: 'linear',
          begin: function() {
            modalEl.style.display = 'flex';
          },
        });
        anime({
          targets: contentEl,
          translateY: '-50%',
          duration: 200,
          easing: 'linear',
          direction: 'reverse',
        });
      } else {
        anime({
          targets: contentEl,
          keyframes: [
            {translateY: '50%'},
            {translateY: 0},
          ],
          duration: 400,
          easing: 'linear',
        });
        anime({
          targets: modalEl,
          opacity: 0,
          duration: 200,
          easing: 'linear',
          complete: function() {
            modalEl.style.display = 'none';
            open.value = false;
          },
        });
      }
    }
  });
});

const onClickOverlay = () => {
  localValue.value = false;
};

const onClose = () => {
  localValue.value = false;
};
</script>
<style lang="postcss">
.modal {
  @apply hidden opacity-0 fixed w-full h-full top-0 left-0 px-3 pt-3 flex-col justify-center;

  &__overlay {
    @apply fixed bg-gray3/30 dark:bg-white/30 w-full h-full top-0 left-0;
  }

  &__content {
    @apply bg-white shadow-lg dark:bg-grayDark rounded-xl p-3 relative mx-auto max-w-full max-h-full overflow-auto p-6;

    width: 525px;
  }

  &__close {
    @apply text-lg absolute top-3 right-4 cursor-pointer p-3;
  }
}
</style>