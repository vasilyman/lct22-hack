<template>
  <div>
    <Slider
      title="Это может быть интересно"
      right-action="Посмотреть все"
      :items="items"
      @all="onAll"
    >
      <template #default="{ item }">
        <div
          class="h-32 w-48 bg-white"
        >{{ item.title }}</div>
      </template>
    </Slider>
    <div class="my-7">
      <Filter
        title="Фильтр"
      />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <IdeaCard
        v-for="card in cadrs" :key="card.id"
        :idea="card"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import TSlideItem from '@/types/TSlideItem';
import TIdeaCard from '@/types/TIdeaCard';

const items: TSlideItem[] = Array(10).fill({}).map((i, ii) => ({ title: 'title' + ii, id: ii.toString() }));

const onAll = () => {
  console.log('all');
  
};

const cadrs: TIdeaCard[] = Array(8).fill({})
  .map((i, ii) => ({
    id: ii.toString(),
    title: 'Очень длиннннннннннное название, возможно в три строки',
    description: 'Короткое описание идеи, идея состоит из разных слов, букв, цифр и это прекрасно я считаю! Бла бла бла бла Бла бла бла бла бла бла...',
    author: {
      name: 'Екатерина Л.',
      photo: '/img/animals.jpeg',
      url: '#',
    },
    likes: 99,
    comments: 89,
  }));

</script>