<template>
  <div>
    <AtomsChatMessage
      :modelValue="newMessage"
      placeholder="Написать сообщение"
    />
    <AtomsLine class="my-8"/>
    <AtomsMediaObject
      v-for="media in props.items" :key="media.codeId"
      :media="media"
      class="mb-8"
    >
      <template #default>
        <AtomsChatMessage
          :model-value="response"
          placeholder="Написать сообщение"
        />
      </template>
      <template #after-title>
        <AtomsIcon name="expert" class="ml-2" title="Эксперт" />
      </template>
    </AtomsMediaObject>
  </div>
</template>
<script lang="ts" setup>
import TMediaObject from '@/types/TMediaObject';
import { PropType } from 'vue';

const props = defineProps({
  items: { type: Array as PropType<TMediaObject[]>, default: () => ([]) },
});

const newMessage = ref('');
const response = ref('');
</script>