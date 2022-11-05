<template>
  <div>
    <h2 class="my-3 text-2xl font-bold">Описание идеи</h2>
    <div
      class="flex flex-col gap-3"
    >
      <AtomsInputText
        label="Название"
        v-model="titleLocal"
      />
      <AtomsTextArea
        label="Описание"
        v-model="descriptionLocal"
      />
      <div class="flex justify-end">
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>

const props = defineProps({
  title: { type: String },
  description: { type: String },
});

interface Emits {
  (e: 'update:title' | 'update:description', value: string): void,
}

const emit = defineEmits<Emits>();

const titleLocal = computed<string>({
  get() {
    return props.title ?? '';
  },
  set(val: string) {
    emit('update:title', val);
  },
});

const descriptionLocal = computed<string>({
  get() {
    return props.description ?? '';
  },
  set(val: string) {
    emit('update:description', val);
  },
});
</script>