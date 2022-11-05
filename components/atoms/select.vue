<template>
  <div
    ref="autocomplete"
    class="relative"
  >
    <AtomsInputText
      v-model="localSearchValue"
      :type="props.type ?? 'text'"
      :placeholder="props.placeholder"
      class="w-full"
      :select-opened="isShowedOptions"
      :dense="dense"
      :flat="flat"
      @focus="onFocus"
      @blur="onBlur"
    />
    <transition name="slidefade">
      <div
        v-if="isShowedOptions"
        class="shadow-md border text-gray3 border-gray rounded-b-md py-2 absolute top-100 left-0 w-full bg-white"
        @click.stop
      >
        <option
          v-for="item in itemsLocal"
          :key="item.value"
          class="py-2 px-4 hover:bg-gray cursor-pointer"
          :value="item.value"
          @click="onSelect(item)"
        >
          {{ item.title }}
        </option>
      </div>
    </transition>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import TListItem from '@/types/TListItem';

const props = defineProps({
  placeholder: { type: String, default: '' },
  type: { type: String, default: '' },
  modelValue: { type: [String, Object] as PropType<TListItem | string>, default: '' },
  search: { type: String, default: '' },
  items: { type: Array as PropType<TListItem[]>, required: true },
  noDataText: { type: String, default: 'Нет данных' },
  dense: { type: Boolean },
  flat: { type: Boolean },
  returnObject: { type: Boolean },
});

interface Emits {
  (e: 'update:modelValue' | 'update:search' | 'select', value: string | TListItem): void,
  (e: 'focus' | 'blur'): void,
}
const emit = defineEmits<Emits>();

const localValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
    emit('select', val);
  }
})

const isShowedOptions = ref(false);

const itemsLocal = computed(() => {
  return props.items.length === 0 ? [{ title: props.noDataText, value: '', disabled: true }] : props.items;
});

const localSearchValue = computed({
  get() {
    return props.search;
  },
  set(val) {
    emit('update:search', val);
  },
});

const onSelect = (val: TListItem) => {
  if (val.disabled) return;
  localValue.value = val.value;
};

const onFocus = () => {
  isShowedOptions.value = true;
};

const onBlur = (e: Event) => {
  isShowedOptions.value = false;
};

const autocomplete = ref<HTMLElement | null>(null);
let autocompleteEl: HTMLElement | null;

watchEffect(() => {
  autocompleteEl = autocomplete.value;
},
{
  flush: 'post',
});

const onClick = (e: Event) => {
  let autocomleteHovered = false;
  if (autocompleteEl && e.target instanceof HTMLElement) {
    autocomleteHovered = autocompleteEl.contains(e.target);
  }
  isShowedOptions.value = autocomleteHovered;
};

onMounted(() => {
  document.addEventListener('click', onClick);
});

onUnmounted(() => {
  document.removeEventListener('click', onClick);
});
</script>
