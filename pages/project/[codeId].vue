<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between">
      <div class="flex gap-3">
        <div class="flex items-center ">
          <i class="fas fa-comment-dots text-xs text-danger mr-3"></i>
          <div class="text-sm">{{ idea.comments }} <span class="hidden lg:inline">комментария</span></div>
        </div>
        <div class="flex items-center">
          <i class="fas fa-heart text-xs text-danger mr-3"></i>
          <div class="text-sm">{{ idea.likes }} <span class="hidden lg:inline">понравилось</span> </div>
        </div>
        <div
          v-if="isInnovation"
          class="flex items-center"
        >
          <i class="far fa-check-circle text-xs text-success mr-3"></i>
          <div class="text-sm hidden lg:block">Инновационная</div>
        </div>
        <div class="flex items-center">
          <i class="fas fa-share text-xs text-gray2 dark:text-white mr-3"></i>
          <div class="text-sm hidden lg:block">Поделиться</div>
        </div>
      </div>
      <div
        v-if="isAuthorIdea"
        class="flex items-center cursor-pointer"
        @click="onEdit('edit')"
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
            Категория: {{ mainCategory }}
          </div>
          <h1 class="text-xl mb-4">{{ idea.title }}</h1>
          <div>
            <img src="" alt="">
          </div>
          <div class="relative">
            <p class="demo-text dark:demo-text-dark">
              {{ ideaDescription }}
            </p>
            <AtomsButton
              color="text"
              small
              class="-ml-2"
              @click="toggleMaximize"
            >
              <span class="mr-2">Подробнее</span>
              <i class="fas fa-maximize"></i>
            </AtomsButton>
          </div>
        </div>
        <div class="lg:col-span-5 col-span-12">
          <div class="flex items-center mb-5">
            <h3 class="font-bold mr-2">Требуемые компетенции</h3>
            <i class="far fa-circle-question text-xs text-gray2"></i>
          </div>
          <div class="gap-1 basis-1/2 flex flex-wrap items-start lg:mb-10 mb-5">
            <AtomsChip
              v-for="item in idea.competencies"
              :key="item.codeId"
              :color="item.color"
            >
              {{ item.title }}
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
              :items="ideaMembersAndAuthor"
              add
              @select="onSelectUser"
              @add="onAdd"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row">
      <div class="profile__container">
        <div class="flex items-center mb-3">
          <h3 class="font-bold mr-2">Трекинг идеи</h3>
          <i class="far fa-circle-question text-xs text-gray2"></i>
        </div>
        <IdeaTracking />
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
          :items="ideaCandidates"
          hide-arrows
        >
          <template #default="{ item }">
            <UserItem :item="item">
              <AtomsButton
                v-if="isAuthorIdea"
                outlined
                small
                class="mt-3"
                @click="onAccept(item)"
              >
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
      <FormIdeaDescription>
        <AtomsButton
          @click="onSubmit(formIdeaComponentType)"
        >
          Сохранить
        </AtomsButton>
      </FormIdeaDescription>
    </AtomsModal>
    <AtomsModal v-model="showFullIdea" fullscreen>
      <h1 class="text-xl mb-4">{{ idea.title }}</h1>
      <div>
        <img src="" alt="">
      </div>
      <p class="">
        {{ idea.description }}
      </p>
    </AtomsModal>
  </div>
</template>
<script lang="ts" setup>
import { useIdeaStore } from '@/stores/idea';
import { useSubsidyStore } from '@/stores/subsidy';
import TSlideItem, { SlideItem } from '@/types/TSlideItem';
import { useAuthStore } from '~~/stores/auth';
import TAvatarItem from '~~/types/TAvatarItem';
import { TFormIdeaDescription } from '~~/types/TFormIdea';
import TIdeaCard, { IdeaCard, IdeaCardDTO } from '~~/types/TIdeaCard';
import TMediaObject from '~~/types/TMediaObject';
import TSelectItem from '~~/types/TSelectItem';
import TSubsidy from '~~/types/TSubsidy';
import { User } from '~~/types/TUser';
import ellipsis from '~~/utils/ellipsis';


const ideaStore = useIdeaStore();
const subsidyStore = useSubsidyStore();
const authStore = useAuthStore();

const route = useRoute();

const codeId = ref<string>(route.params.codeId as string);

const ideaSync = useAsyncData<TIdeaCard>(async () => {
  const res = await ideaStore.fetchIdea(codeId.value);
  return res;
});

const demoSubsidy: TSubsidy = {
  id: 'one',
  title: 'Демо субсидия',
  image: 'https://placeimg.com/180/180/nature',
};

const itemsSync = useAsyncData<SlideItem[]>(async () => {
  const res = await subsidyStore.fetchSubsidyList({});
  return res.length === 0 ? [demoSubsidy] : res;
});

await Promise.allSettled([ideaSync, itemsSync]);

if (!ideaSync.data.value) throw createError({ statusCode: 404 });

const idea = computed(() => {
  return new IdeaCardDTO(ideaSync.data.value);
});
const items = itemsSync.data.value?.map((item) => new SlideItem(item)) ?? [];

const userListVariants: TSelectItem[] = [
  {
    value: 'CANDIDATE',
    title: 'Заявки',
  },
  {
    value: 'RECOMMENDED',
    title: 'Рекомендованные',
  },
];

const userListVariant = ref<string>('CANDIDATE');

const ideaCandidates = computed<TSlideItem[]>(() => {
  return (idea.value.members ?? [])
    .filter((item) => {
      return item.status === userListVariant.value;
    })
    .map((item) => ({
      title: item.getFullName(),
      image: item.photo || 'https://placeimg.com/180/180/people',
      id: item.id,
    }));
});

const ideaMembers = computed(() => {
  return (idea.value.members ?? []).filter((item) => {
    return item.status === 'MEMBER';
  });
});

const ideaMembersAndAuthor: TAvatarItem[] = [idea.value.author, ...ideaMembers.value].map((item, i) => ({
  value: item.id,
  title: (i === 0 ? 'Автор: ' : '') + item.getFullName(),
  url: item.photo
})) || [];

const isInnovation = computed<boolean>(() => {
  return !!idea.value.innovations?.length;
});

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
  router.push({ name: 'profile', params: { codeId: userId }});
};

const editModal = ref(false);
const formIdeaComponentType = ref('');

const isAuthorIdea = computed<boolean>(() => {
  return idea.value.author.id === authStore.user?.id;
});

const isAdmin = computed<boolean>(() => {
  return authStore.isAdmin;
});

const onEdit = (type?: string) => {
  if (isAuthorIdea.value && type === 'edit') {
    router.push({ name: 'edit-project', params: { codeId: codeId.value }});
    return;
  }

  formIdeaComponentType.value = type ?? '';
  editModal.value = true;
};


const onSubmit = (type: string) => {
  console.log(type);
};

const mainCategory = computed<string>(() => {
  return idea.value.tags?.sort((a, b) => a.ordered - b.ordered)[0]?.title || 'нет присвоена';
});

const ideaDescription = computed<string>(() => {
  return ellipsis(idea.value.description, 400);
});

const showFullIdea = ref(false);

const toggleMaximize = () => {
  showFullIdea.value = !showFullIdea.value;
};

const onAdd = () => {
  if (isAuthorIdea.value || isAdmin.value) {
    console.log('select user');
  } else {
    const userId = authStore.user?.id;
    if (userId) ideaStore.joinAs(idea.value.codeId, userId, 'CANDIDATE')
      .then(() => {
        ideaSync.refresh();
      });
  }
};

const onAccept = (acceptedUser: SlideItem) => {
  ideaStore.joinAs(idea.value.codeId, acceptedUser.id, 'MEMBER')
    .then(() => {
      ideaSync.refresh();
    });
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