<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between">
      <div class="flex gap-3">
        <div class="flex items-center ">
          <i class="fas fa-comment-dots text-xs text-danger mr-3"></i>
          <div class="text-sm">5433 <span class="hidden lg:inline">комментария</span></div>
        </div>
        <div class="flex items-center">
          <i class="fas fa-heart text-xs text-danger mr-3"></i>
          <div class="text-sm">45345 <span class="hidden lg:inline">понравилось</span> </div>
        </div>
        <div class="flex items-center">
          <i class="far fa-check-circle text-xs text-success mr-3"></i>
          <div class="text-sm hidden lg:block">Инновационная</div>
        </div>
        <div class="flex items-center">
          <i class="fas fa-share text-xs text-gray2 dark:text-white mr-3"></i>
          <div class="text-sm hidden lg:block">Поделиться</div>
        </div>
      </div>
      <div
        class="flex items-center cursor-pointer"
        @click="onEdit()"
      >
        <i class="fas fa-pencil text-xs text-gray2 dark:text-white mr-3"></i>
        <div class="text-sm hidden lg:block">Редактировать идею</div>
      </div>
    </div>
    <div class="flex flex-row">
      <div class="profile__container rounded-t-xl grid grid-cols-12 gap-3">
        <div class="lg:col-span-7 col-span-12">
          <div
            class="text-sm text-gray2 mb-1 cursor-pointer inline-block"
            @click="onEdit('theme')"
          >
            <i class="fas fa-pencil mr-1"></i>
            Категория: {{ idea.codeId }}
          </div>
          <h1 class="text-xl mb-4">{{ idea.title }}</h1>
          <div>
            <img src="" alt="">
          </div>
          <p class="pb-5">{{ idea.description }}</p>
        </div>
        <div class="lg:col-span-5 col-span-12">
          <div class="flex items-center mb-5">
            <h3 class="font-bold mr-2">Требуемые компетенции</h3>
            <i class="far fa-circle-question text-xs text-gray2"></i>
          </div>
          <div class="gap-1 basis-1/2 flex flex-wrap items-start lg:mb-10 mb-5">
            <AtomsChip
              v-for="tag in idea.tags"
              :key="tag.codeId"
              :color="tag.color"
            >
              {{ tag.title }}
            </AtomsChip>
          </div>
          <div class="flex items-center mb-5">
            <h3 class="font-bold mr-2">Команда</h3>
            <i class="far fa-circle-question text-xs text-gray2"></i>
          </div>
          <div>
            <div class="text-sm text-gray2 mb-5">
              <span class="project__command-arrow">Всего 6 человек! Мы ждем именно тебя.</span>
            </div>
            <AtomsAvatarRow
              :items="idea.command"
              add
              @select="onSelectUser"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-3">
      <div class="profile__container lg:col-span-1 col-span-2">
        <div class=" flex justify-between items-center mb-5">
          <div class="flex items-center mr-3">
            <h3 class="font-bold mr-2">Документы</h3>
            <i class="far fa-circle-question text-xs text-gray2"></i>
          </div>
          <div>
            <i class="far fa-plus cursor-pointer"></i>
          </div>
        </div>
        <div>
          <AtomsDocumentList :items="idea.documents" />
        </div>
      </div>
      <div class="profile__container lg:col-span-1 col-span-2 dark:bg-white/20">
        <div class=" flex justify-between items-center mb-5">
          <div class="flex items-center mr-3">
            <h3 class="font-bold mr-2">Где получить поддержку</h3>
            <i class="far fa-circle-question text-xs text-gray2"></i>
          </div>
          <div class="text-gray2 text-sm text-right whitespace-nowrap">
            Посмотреть все
          </div>
        </div>
        <Slider
          :items="items"
          hide-arrows
        >
          <template #default="{ item }">
            <IdeaCardSmall
              :item="item"
              class="cursor-pointer"
              tiny
              @click="onClickSliderItem(item)"
            />
          </template>
        </Slider>
      </div>
    </div>
    <div class="flex flex-row gap-3">
      <div class="profile__container lg:px-10">
        <AtomsButtonGroup
          :items="userListVariants"
          v-model="userListVariant"
          class="mb-6"
        />
        <Slider
          :items="userItems"
          hide-arrows
        >
          <template #default="{ item }">
            <UserItem :item="item">
              <AtomsButton outlined small class="mt-3">
                Принять
              </AtomsButton>
            </UserItem>
          </template>
        </Slider>
      </div>
    </div>
    <div class="flex flex-row gap-3">
      <div class="profile__container rounded-b-xl lg:px-10">
        <div class="flex items-center mb-8">
          <h3 class="font-bold mr-2">Комментарии</h3>
        </div>
        <Chat :items="history" />
      </div>
    </div>
    <AtomsModal
      v-model="editModal"
      :title="'Редактирование идеи'"
    >
      <FormIdeaDescription v-model="ideaDescription">
        <AtomsButton
          @click="onSubmit(formIdeaComponentType)"
        >
          Сохранить
        </AtomsButton>
      </FormIdeaDescription>
    </AtomsModal>
  </div>
</template>
<script lang="ts" setup>
import { useIdeaStore } from '@/stores/idea';
import TSlideItem, { SlideItem } from '@/types/TSlideItem';
import TAvatarItem from '~~/types/TAvatarItem';
import { TFormIdeaDescription } from '~~/types/TFormIdea';
import TIdeaCard, { IdeaCard } from '~~/types/TIdeaCard';
import TMediaObject from '~~/types/TMediaObject';
import TSelectItem from '~~/types/TSelectItem';

const ideaStore = useIdeaStore();

const route = useRoute();

const codeId = ref<string>(route.params.codeId as string);

const ideaSync = useAsyncData<TIdeaCard>(async () => {
  const res = await ideaStore.fetchIdea(codeId.value);
  return new IdeaCard(res);
});

const itemsSync = useAsyncData<TSlideItem[]>(async () => {
  const res = await ideaStore.fetchIdeaList({}).catch(() => ([]));
  return res.map((item) => new SlideItem({
    id: item.codeId,
    title: item.title,
    image: item.imageUrl,
  }));
});

await Promise.allSettled([ideaSync, itemsSync]);

if (!ideaSync.data.value) throw createError({ statusCode: 404 });

const idea = ideaSync.data.value;
const items = itemsSync.data.value;

const router = useRouter();
const onClickSliderItem = async (item: TSlideItem) => {
  clearNuxtData();
  router.push({ params: { codeId: item.id} })
}

const history: TMediaObject[] = [
  {
    codeId: 'one',
    message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    author: {
      name: 'Jacob Jones',
      photoUrl: 'https://placeimg.com/180/180/people',
    },
    createdAt: '2022-11-12T22:15',
    media: [{
      codeId: 'two',
      message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      author: {
        name: 'Jacob Jones',
        photoUrl: 'https://placeimg.com/180/180/people',
      },
      createdAt: '2022-11-12T22:15'
    }]
  },
  {
    codeId: 'one',
    message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
    author: {
      name: 'Jacob Jones',
      photoUrl: 'https://placeimg.com/180/180/people',
    },
    createdAt: '2022-11-12T22:15',
    media: [{
      codeId: 'two',
      message: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      author: {
        name: 'Jacob Jones',
        photoUrl: 'https://placeimg.com/180/180/people',
      },
      createdAt: '2022-11-12T22:15'
    }]
  },
];

const onSelectUser = (user: TAvatarItem) => {
  const userId = user.value;
  router.push('/profile');
};


const editModal = ref(false);
const formIdeaComponentType = ref('');
const onEdit = (type?: string) => {
  formIdeaComponentType.value = type ?? '';
  editModal.value = true;
};

const userItems: TSlideItem[] = Array(10).fill({}).map((item) => ({
  title: 'one',
  id: 'one',
  image: 'https://placeimg.com/180/180/people'
}));

const userListVariants: TSelectItem[] = [
  {
    value: 'requested',
    title: 'Заявки',
  },
  {
    value: 'recommended',
    title: 'Рекомендованные',
  },
];

const userListVariant = ref<string | number>('requested');

const ideaDescription = reactive<TFormIdeaDescription>({
  title: '',
  description: '',
});

const onSubmit = (type: string) => {
  console.log(type, ideaDescription);
};

onUnmounted(() => {
  clearNuxtData();
});

</script>
<style lang="postcss">
.project__command-arrow {
  @apply relative;

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 100%;
    width: 50px;
    height: 40px;
    background-image: url('@/assets/img/arrow.png');
    background-repeat: no-repeat;
    background-position: 0 0;
    background-size: contain;
  }
}
</style>