<template>
  <div class="checkbox">
    <input
      type="checkbox"
      v-model="localValue"
      class="checkbox__input"
      :class="{
        'checkbox__input-disabled': props.disabled,
      }"
      :disabled="props.disabled"
    >
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: Boolean },
  disabled: { type: Boolean },
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
</style>