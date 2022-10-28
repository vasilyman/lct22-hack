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
          class="h-40 w-48 flex flex-col" 
        >
          <div
            v-if="item.image"
            class="flex-1 overflow-hidden mb-3"
          >
            <img
              :src="item.image"
              :alt="item.title"
              class="object-cover h-full w-full"
            >
          </div>
          <div class="text-xs">{{ item.title }}</div>
        </div>
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

const items: TSlideItem[] = Array(10).fill({}).map((i, ii) => ({ title: 'Категория ' + (ii + 1), id: ii.toString(), image: 'https://placeimg.com/180/100/animals' }));

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
    hasGrant: Math.random() > 0.5,
    createdAt: '2022-11-10T12:23',
    tags: [
      {
        codeId: 'html',
        title: 'HTML',
        color: 'primary',
      },
      {
        codeId: 'java',
        title: 'Java',
        color: 'success'
      },
      {
        codeId: 'figma',
        title: 'Figma',
        color: 'warning'
      },
      {
        codeId: 'html',
        title: 'HTML',
        color: 'white',
      },
      {
        codeId: 'java',
        title: 'Java',
        color: 'danger'
      },
      {
        codeId: 'figma',
        title: 'Figma',
        color: 'warning'
      },
      {
        codeId: 'html',
        title: 'HTML',
        color: 'white',
      },
      {
        codeId: 'java',
        title: 'Java',
        color: 'info'
      },
      {
        codeId: 'figma',
        title: 'Figma',
        color: 'warning'
      },
    ].slice(0, Math.ceil(Math.random() * 5 + 3))
  }));

</script>