<template>
  <div class="">
    <label
      v-if="props.label"
      :for="id"
      class="mb-1 block text-sm text-gray2"
    >
      {{ props.label }}
    </label>
    <input
      ref="input"
      :id="id"
      v-model="localValue"
      class="border border-gray rounded-t-lg w-full p-3 bg-white/0 outline-none transition-all duration-300"
      :class="{
        'rounded-b-lg': !props.selectOpened,
      }"
      :type="props.type ?? 'text'"
      :placeholder="props.placeholder"
      :autofocus="autofocus"
      :name="name"
      :autocomplete="disableAutocomplete ? 'nope': 'on'"
      @focus="onFocus"
      @blur="onBlur"
    >
  </div>
</template>
<script lang="ts" setup>
import { nanoid } from 'nanoid';

const id = nanoid();

const props = defineProps({
  placeholder: { type: String },
  type: { type: String },
  modelValue: { type: String, required: true },
  autofocus: { type: Boolean },
  label: { type: String },
  name: { type: String },
  selectOpened: { type: Boolean },
  disableAutocomplete: { type: Boolean },
});

interface Emits {
  (e: 'update:modelValue', value: string): void,
  (e: 'focus' | 'blur', value: Event): void,
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

const onFocus = (e: Event) => {
  emit('focus', e);
};

const onBlur = (e: Event) => {
  emit('blur', e);
};

const input = ref<HTMLInputElement | null>(null);
onMounted(() => {
  // fix autofocus
  const activeEl = document.activeElement;
  if (props.autofocus && input.value instanceof HTMLInputElement && input.value !== activeEl) {
    input.value.focus();
  }
});
</script>