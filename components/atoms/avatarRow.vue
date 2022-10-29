<template>
  <div class="flex items-center">
    <div
      v-if="props.items.length > 0"
      class="flex mr-8"
    >
      <div
        v-for="item in props.items" :key="item.value"
        class="w-8"
      >
        <AtomsAvatar
          class="shadow-sm border-2 border-gray/0 hover:border-gray transition-border duration-300 cursor-pointer"
          :src="item.url"
          :alt="item.title"
          circle
          large
          :title="item.title"
          @click="onClick(item)"
        />
      </div>
    </div>  
    <div
      v-if="add"
      title="Вступить в команду"
      class="avatar-row__add"
      @click="onAdd"
    >
      <i class="far fa-plus"></i>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TAvatarItem from '@/types/TAvatarItem';
import { PropType } from 'vue';

const props = defineProps({
  items: { type: Array as PropType<TAvatarItem[]>, default: () => ([]) },
  add: { type: Boolean },
});

interface Emits {
  (e: 'select', value: TAvatarItem): void,
  (e: 'add'): void,
}
const emit = defineEmits<Emits>();

const onClick = (item: TAvatarItem) => {
  emit('select', item);
};

const onAdd = (item: TAvatarItem) => {
  emit('add');
};
</script>
<style lang="postcss">
.avatar-row__add {
  @apply rounded-full border border-gray h-8 w-8 flex justify-center items-center cursor-pointer hover:shadow-md transition-shadow duration-300 relative;

  
}
</style>