<template>
  <div>
    <ul
      class="border border-gray2 rounded-lg"
    >
      <template v-for="(item, i) in items" :key="item.value">
        <li
          class="flex h-12 items-stretch px-2 hover:bg-gray2/20 transition-all duration-100"
        >
          <div
            class="flex items-center select-none cursor-pointer"
          >
            <slot name="prepend">
              <div class="p-2 ">
                <i class="fas fa-bars"></i>
              </div>
            </slot>
          </div>
          <div class="flex-1 flex items-center">
            <slot :item="item">{{ item.title }}</slot>
          </div>
          <div
            class="flex items-center select-none cursor-pointer"
            @click="onDelete(item)"
          >
            <slot name="append">
              <div class="p-2 hover:text-danger transition-all duration-200">
                <i class="fas fa-close"></i>
              </div>
            </slot>
          </div>
        </li>
        <AtomsLine v-if="i < items.length - 1" />
      </template>
      <div
        v-if="items.length === 0"
        class="h-12 flex items-center justify-center"
      >
        <div class="text-sm text-gray2">Не выбрано</div>
      </div>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import { TListItemOrdered } from '@/types/TListItem';

const props = defineProps({
  items: { type: Array as PropType<TListItemOrdered[]>, default: () => ([])},
});

interface Emits {
  (e: 'delete', value: TListItemOrdered): void,
}
const emit = defineEmits<Emits>();

const onDelete = (val: TListItemOrdered) => {
  emit('delete', val);
};
</script>