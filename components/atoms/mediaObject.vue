<template>
  <div class="flex flex-row">
    <div>
      <AtomsAvatar
        :src="media.author.photoUrl"
        class="mr-3"
        circle
        large
      />
    </div>
    <div class="">
      <div class="flex items-baseline mb-2">
        <div class="mr-5"><strong>{{ media.title || media.author.name }}</strong></div>
        <div
          v-if="media.createdAt"
          class="text-xs text-gray2"
          :title="createdAt"
        >{{ created }}</div>
      </div>
      <div class="text-sm mb-8">{{ media.message }}</div>
      <AtomsMediaObject
        v-if="media.media && media.media.length > 0"
        v-for="child in media.media" :key="child.codeId"
        :media="child"
      />
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import TMediaObject from '@/types/TMediaObject';
import { PropType } from 'vue';

const { $dayjs } = useNuxtApp();

const props = defineProps({
  media: { type: Object as PropType<TMediaObject>, default: () => ({}) },
});

let createdAt: string;
let created: string;

try {
  created = $dayjs(props.media.createdAt).toNow();
  createdAt = $dayjs(props.media.createdAt).format('DD MMM YYYY HH:MM:SS');
} catch (error) {
  console.log(error);
}
</script>