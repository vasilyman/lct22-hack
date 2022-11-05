<template>
  <div class="">
    <label
      v-if="props.label"
      :for="id"
      class="mb-1 block text-sm text-gray2"
    >
      {{ props.label }}
    </label>
    <textarea
      ref="input"
      :id="id"
      v-model="localValue"
      class="border border-gray rounded-lg w-full p-3 bg-white/0 outline-none"
      :placeholder="props.placeholder"
      :autofocus="autofocus"
      :rows="props.rows"
      @input="onInput"
    />
  </div>
</template>
<script lang="ts" setup>
import { nanoid } from 'nanoid';

const id = nanoid();

const props = defineProps({
  placeholder: { type: String },
  modelValue: { type: String, required: true },
  autofocus: { type: Boolean },
  label: { type: String },
  rows: { type: String, default: '5' },
});

interface Emits {
  (e: 'update:modelValue', value: string): void,
}
const emit = defineEmits<Emits>();

const localValue = ref('');
const modelValue = ref(props.modelValue);

watchEffect(() => {
  localValue.value = modelValue.value;
});

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLTextAreaElement).value);
}

const input = ref<HTMLTextAreaElement | null>(null);

const autoHeightHandler = (e: Event) => {
  const el = e.target;
  if (el instanceof HTMLTextAreaElement) {
    const offset = el.offsetHeight - el.clientHeight;
    el.style.height = 'auto';
    el.style.height = el.scrollHeight + offset + 'px';
  }
}
onMounted(() => {
  // fix autofocus
  const activeEl = document.activeElement;
  const inputEl = input.value;
  if (props.autofocus && inputEl && inputEl !== activeEl) {
    inputEl.focus();
  }

  // fix autoresize
  if (inputEl) {
    inputEl.style.boxSizing = 'border-box';
    inputEl.addEventListener('input', autoHeightHandler);
  }
});

onUnmounted(() => {
  const inputEl = input.value;

  if (inputEl) inputEl.removeEventListener('input', autoHeightHandler);
});
</script>