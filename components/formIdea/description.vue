<template>
  <div>
    <h2 class="my-3 text-2xl font-bold">Описание идеи</h2>
    <div
      class="flex flex-col gap-3"
    >
      <AtomsInputText
        label="Название"
        v-model="form.title"
      />
      <AtomsTextArea
        label="Описание"
        v-model="form.description"
      />
      <div class="flex justify-end">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { TFormIdeaDescription, FormIdea } from '~~/types/TFormIdea';
import { PropType } from 'vue';

const props = defineProps({
  modelValue: { type: Object as PropType<TFormIdeaDescription>, default: () => ({}) },
});

interface Emits {
  (e: 'update:modelValue', value: TFormIdeaDescription): void,
}

const emit = defineEmits<Emits>();

const form = computed<TFormIdeaDescription>({
  get() {
    return props.modelValue;
  },
  set(val: TFormIdeaDescription) {
    emit('update:modelValue', val);
  },
});
</script>