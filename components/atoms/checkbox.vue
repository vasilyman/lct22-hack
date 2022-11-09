<template>
  <div>
    <input
      type="checkbox"
      v-model="localValue"
      class=""
    >
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: Boolean },
});

interface Emits {
  (e: 'update:modelValue', value: boolean): void,
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
</script>
<style lang="postcss">
.checkbox {
  &__input {
    @apply appearance-none border border-gray2 h-5 w-5 checked:checedk;
  }
}
</style>