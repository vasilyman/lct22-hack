<template>
  <div class="">
    <label
      v-if="props.label"
      :for="id"
      class="mb-1 block text-sm text-gray2"
    >
      {{ props.label }}
    </label>
    <div
      class="input-file__input"
      @drop="onDrop"
      @dragover.prevent
      @click="onClick"
    >
      <div class="pointer-events-none">Перетащите файлы сюда</div>
    </div>
    <input
      ref="input"
      :id="id"
      class="hidden"
      type="file"
      :placeholder="props.placeholder"
      :multiple="multiple"
      hidden
      @input="onInput"
    >
  </div>
</template>
<script lang="ts" setup>
import { nanoid } from 'nanoid';
import { PropType } from 'vue';

const id = nanoid();

const props = defineProps({
  placeholder: { type: String },
  type: { type: String },
  modelValue: { type: Object as PropType<FileList>, default: () => ({}) },
  label: { type: String },
  multiple: { type: Boolean },
});

interface Emits {
  (e: 'update:modelValue', value: FileList): void,
}
const emit = defineEmits<Emits>();

const localValue = ref({});
const modelValue = ref(props.modelValue);

watch(modelValue, (val) => {
  if (val !== undefined) localValue.value = val;
});

const onInput = (e: Event) => {
  const fileList = (e.target as HTMLInputElement).files
  if (fileList) emit('update:modelValue', fileList);
}

const input = ref<HTMLInputElement | null>(null);

const onClick = (e: Event) => {
  const inputEl = input.value;
  if (inputEl) inputEl.click();
};

const onDrop = (e: Event) => {
  e.preventDefault();
  const inputEl = input.value;
  if (e instanceof DragEvent && inputEl instanceof HTMLInputElement) {
    let fileList = e.dataTransfer?.files ?? null;
    if (!props.multiple && fileList) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(fileList[0]);
      fileList = dataTransfer.files;
    }
    if (fileList) emit('update:modelValue', fileList);
  }
};
</script>
<style lang="postcss">
.input-file__input {
  @apply h-16 flex justify-center items-center select-none text-gray2 cursor-pointer border-dashed border border-gray rounded-lg w-full p-3 bg-white/0 outline-none;
}
</style>