<template>
  <div class="bg-gradient-blue rounded-lg shadow-sm p-4">
    <div class="mb-3"><strong>{{ idea.title }}</strong></div>
    <div class="text-sm mb-4">{{ idea.description }}</div>
    <div class="text-xs mb-4">
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
    <div class="flex text-xs">
      <div class="text-gray2">Люди реагируют на это!</div>
      <div class="flex-1"></div>
      <div class="flex items-center mr-2">
        <i class="fas fa-heart text-red mr-1"></i>
        <span class="text-gray2">{{ idea.likes }}</span>
      </div>
      <div class="flex items-center">
        <i class="fas fa-comments text-red mr-1"></i>
        <span class="text-gray2">{{ idea.comments }}</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TIdeaCard from '@/types/TIdeaCard';
import { PropType } from 'vue';

const props = defineProps({
  idea: { type: Object as PropType<TIdeaCard>, default: '' },
});

const idea = props.idea;
</script>