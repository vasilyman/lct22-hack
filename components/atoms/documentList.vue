<template>
  <ul>
    <li
      v-for="doc in localItems" :key="doc.codeId"
      class="flex items-center mb-3"
    >
      <div class="w-6 h-6 mr-3">
        <img
          class="object-cover max-w-full max-h-full"
          :src="doc.docType"
          :alt="doc.type"
          :title="doc.type"
        >
      </div>
      <div
        class="overflow-hidden text-ellipsis whitespace-nowrap mr-3 flex-1"
        :title="doc.title"
      >
        {{ doc.title }}
      </div>
      <div class="">{{ doc.size }}</div>
      <div
        v-if="props.allowDelete"
        class="h-8 w-8 p-1 text-danger ml-3 text-center cursor-pointer"
        @click="onDelete(doc)"
      >
        <i class="fas fa-close"></i>
      </div>
    </li>
  </ul>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';
import TDocument from '@/types/TDocument';
import filesize from '@/utils/filesize';

const props = defineProps({
  items: { type: Array as PropType<TDocument[]>, default: [] },
  allowDelete: { type: Boolean },
});

const docType: { [key: string]: string } = {
  'application/pdf': '/img/file_pdf.png',
  any: '/img/file_any.png'
};

const localItems = computed(() => {
  return props.items.map((item: TDocument, i: number) => ({
    ...item,
    size: filesize(item.size),
    codeId: item.codeId ?? i,
    docType: docType[item.type] ?? docType['any'],
  }));
});

interface Emits {
  (e: 'delete', value: TDocument): void,
}
const emit = defineEmits<Emits>();

const onDelete = (doc: TDocument) => {
  emit('delete', doc);
};
</script>