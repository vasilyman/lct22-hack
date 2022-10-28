<template>
  <div>
    <input
      v-model="localValue"
      class="border border-gray rounded-lg h-12 w-full p-3 bg-white/0 outline-none"
      :type="type ?? 'text'"
      :placeholder="props.placeholder"
      @input="onInput"
    >
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  placeholder: { type: String },
  type: { type: String },
  modelValue: { type: String, required: true },
});

interface Emits {
  (e: 'update:modelValue', value: string): void,
}
const emit = defineEmits<Emits>();

const localValue = ref('');
const modelValue = ref(props.modelValue);

watch(modelValue, (val) => {
  localValue.value = val;
});

const onInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
}
</script>