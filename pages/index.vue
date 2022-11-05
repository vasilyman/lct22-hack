<template>
  <div>
    <div class="bg-white dark:bg-grayDarkContent dark:bg-none py-6 px-7 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center mr-3">
          <h3 class="font-bold mr-2">Это может быть интересно</h3>
          <i class="far fa-circle-question text-xs text-gray2"></i>
        </div>
        <div
          class="text-gray2 text-sm text-right"
          @click="onAll"
        >
          Посмотреть все
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
      <IdeaCard
        v-for="card in cadrs" :key="card.codeId"
        :idea="card"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import TSlideItem, { SlideItem } from '@/types/TSlideItem';
import TIdeaCard from '@/types/TIdeaCard';
import { useIdeaStore } from '@/stores/idea';

const onAll = () => {
  console.log('all');
};

const ideaStore = useIdeaStore();

const cadrs = ref<TIdeaCard[]>([]);
const items = ref<TSlideItem[]>([]);

const cardsSync = await useAsyncData<TIdeaCard[]>(() => ideaStore.fetchIdeaList({}));

if (cardsSync.data.value) {
  cadrs.value = cardsSync.data.value;
  items.value = cardsSync.data.value.map((item) => new SlideItem({
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