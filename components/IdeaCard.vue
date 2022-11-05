<template>
  <div class="bg-white dark:bg-grayDarkContent dark:bg-none rounded-lg shadow-sm p-4">
    <div class="mb-3">
      <nuxt-link :to="ideaLink">
        <strong>{{ idea.title }}</strong>
      </nuxt-link>
    </div>
    <div class="text-sm mb-4">{{ idea.description }}</div>
    <div class="text-xs mb-4 flex flex-row justify-between">
      <div class="basis-1/2">
        <div class="mb-1">Автор</div>
        <div class="flex items-center">
          <AtomsAvatar
            :src="idea.author.photo"
            small
            class="mr-2"
          />
          <div>{{ idea.author.name }}</div>
        </div>
      </div>
      <div class="gap-1 basis-1/2 flex flex-wrap justify-end items-start">
        <AtomsChip
          v-for="tag in idea.tags"
          :key="tag.codeId"
          :color="tag.color"
        >
          {{ tag.title }}
        </AtomsChip>
      </div>
    </div>
    <div class="flex text-xs">
      <div
        class="text-gray2"
        :title="createdAt"
      >Создана {{ created }}</div>
      <div class="flex-1"></div>
      <div v-if="idea.hasGrant" class="flex items-center mr-2">
        <i class="far fa-check-circle text-success mr-1"></i>
        <span class="text-gray2">Инновационная</span>
      </div>
      <div class="flex items-center mr-2">
        <i class="fas fa-heart text-danger mr-1"></i>
        <span class="text-gray2">{{ idea.likes }}</span>
      </div>
      <div class="flex items-center">
        <i class="fas fa-comment-dots text-danger mr-1"></i>
        <span class="text-gray2">{{ idea.comments }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TIdeaCard from '@/types/TIdeaCard';
import { PropType } from 'vue';

const { $dayjs } = useNuxtApp();

const props = defineProps({
  idea: { type: Object as PropType<TIdeaCard>, default: '' },
});

const idea = props.idea;

let createdAt: string;
let created: string;
try {
  created = $dayjs(idea.createdAt).toNow();
  createdAt = $dayjs(idea.createdAt).format('DD MMM YYYY HH:MM:SS');
} catch (error) {
  console.log(error);
}

const ideaLink: string = `/project/${idea.codeId}`;
</script>