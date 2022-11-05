<template>
  <div>
    <h2 class="my-3 text-2xl font-bold">Документы</h2>
    <AtomsDocumentList
      :items="form"
      allow-delete
      @delete="onDelete"
    />
    <AtomsInputFile
      multiple
      @update:model-value="onInput"
    />
  </div>
</template>
<script lang="ts" setup>
import { TFormIdeaDescription, FormIdea } from '~~/types/TFormIdea';
import { PropType } from 'vue';
import TDocument from '~~/types/TDocument';
import { nanoid } from 'nanoid';

const props = defineProps({
  modelValue: { type: Array as PropType<TDocument[]>, default: () => ([]) },
});

interface Emits {
  (e: 'update:modelValue', value: TDocument[]): void,
}

const emit = defineEmits<Emits>();

const form = computed<TDocument[]>({
  get() {
    return props.modelValue;
  },
  set(val: TDocument[]) {
    emit('update:modelValue', val);
  },
});

const onInput = (val: FileList) => {
  [...val].forEach((file) => {
    form.value.push({
      codeId: nanoid(),
      title: file.name,
      type: file.type,
      size: file.size,
      file: file,
    });
  });
};

const onDelete = (doc: TDocument) => {
  const index = form.value.findIndex((item) => item.codeId === doc.codeId);

  if (index !== -1) form.value = form.value.splice(index, 1);
};
</script>