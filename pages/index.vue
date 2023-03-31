<template>
  <div>
    <div class="bg-white dark:bg-grayDarkContent dark:bg-none py-6 px-7 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-6">
        <div class="mr-3">
          <span class="font-bold mr-2">Набирающие популярность</span>
          <i
            class="far fa-circle-question text-xs text-gray2"
            title="Самый высокий рост за неделю"
          ></i>
        </div>
        <div
          class="text-gray2 text-sm text-right"
          @click="onAll"
        >
          <span class="">Рейтинг</span>
        </div>
      </div>
      <Slider
        :items="items"
        class="-mr-7"
      >
        <template #default="{ item }">
          <IdeaCardSmall
            :item="item"
            class="cursor-pointer"
            @click="onClickSliderItem(item)"
          />
        </template>
      </Slider>
    </div>
    <div class="my-7">
      <Filter
        title="Фильтр"
      />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <div
        v-for="card in cadrs" :key="card.codeId"
        class="bg-white dark:bg-grayDarkContent rounded-lg shadow-sm p-4"
      >
        <ProjectCard :idea="card" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import TSlideItem, { SlideItem } from '@/types/TSlideItem';
import TIdeaCard, { IdeaCardDTO } from '@/types/TIdeaCard';
import { useIdeaStore } from '@/stores/idea';
import { ProjectCard } from '@/entities/project-card';
import ideaService from '~~/services/ideaService';

const onAll = () => {
  console.log('all');
};

const cadrs = ref<TIdeaCard[]>([]);
const items = ref<TSlideItem[]>([]);

const { data: cardsSync } = await ideaService.getList();

console.log(cardsSync.value);


if (cardsSync.value) {
  const ideas = cardsSync.value.map((item) => new IdeaCardDTO(item));
  cadrs.value = ideas;
  items.value = ideas.map((item) => new SlideItem({
    id: item.codeId,
    title: item.title,
    image: item.imageUrl
  }));
}

const router = useRouter();
const onClickSliderItem = (item: TSlideItem) => {
  router.push(`/project/${item.id}`);
}
</script>