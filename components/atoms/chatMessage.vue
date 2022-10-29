<template>
  <div class="flex items-center">
    <div>
      <AtomsAvatar
        class="mr-3"
        circle
        large
      />
    </div>
    <AtomsInputText
      v-model="localValue"
      class="w-full"
      :type="type"
      :placeholder="placeholder"
    />
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