<template>
  <div class="grid grid-cols-3 gap-3">
    <div class="col-span-3 lg:col-span-1 flex flex-col gap-3">
      <div class="profile__container lg:rounded-tl-xl max-lg:rounded-t-xl flex flex-col items-center ">
        <div
          class="w-32 h-32 rounded-full overflow-hidden my-4"
        >
          <img
            class="w-full h-full object-cover"
            :src="profile.avatar"
            alt=""
          >
        </div>
        <div class="xl:hidden flex items-start gap-3 my-3">
          <AtomsButton color="white" outlined @click="onEdit">
            <i class="fa-solid fa-pencil "></i>
          </AtomsButton>
          <AtomsButton outlined @click="onExit">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
          </AtomsButton>
        </div>
        <div>
          <strong>{{ fullname }}</strong>
        </div>
        <div class="text-sm text-gray2 mb-4">
          {{ mainCompetence }}
        </div>
        <div class="flex w-full mb-4">
          <div
            class="flex-grow text-center flex flex-col justify-between"
            :title="`Личных: ${profile.ownIdeasCount}\nУчастник: ${profile.ideasCount}`"
          >
            <div class="">
              <img class="mx-auto" src="@/assets/img/brain.png" alt="">
            </div>
            <div
              class="flex items-center justify-center"
            >
              <span><strong class="text-md mr-1">{{ totalIdeas }}</strong></span>
              <span class="text-sm">идей</span>
            </div>
          </div>
          <AtomsLine vertical />
          <div class="flex-grow text-center flex flex-col justify-between">
            <div class="flex mx-auto items-center">
              <span><strong class="text-md mr-1">{{ profile.rating }}</strong></span>
              <div>
                <img class="mx-auto" src="@/assets/img/star.png" alt="">
              </div>
            </div>
            <span class="text-sm">рейтинг</span>
          </div>
        </div>
      </div>
      <div class="profile__container lg:rounded-bl-xl flex-grow">
        Вы приняли участие в проекте
      </div>
    </div>
    <div class="col-span-3 lg:col-span-2 flex flex-col gap-3">
      <div class="profile__container lg:rounded-tr-xl">
        <div class="flex max-lg:gap-3 lg:gap-5">
          <div class="">
            <div class="text-sm text-gray2 mb-2">Возраст</div>
            {{ birthsday }}
          </div>
          <div class="">
            <div
              class="text-sm text-gray2 mb-2"
              :title="createdAt"
            >Дата регистрации</div>
            {{ created }}
          </div>
          <div class="">
            <div class="text-sm text-gray2 mb-2">Город</div>
            {{ profile.city?.title }}
          </div>
          <div class="flex-1"></div>
          <div class="hidden xl:flex items-start gap-3">
            <AtomsButton color="white" outlined @click="onEdit">
              <span class="mr-3">Редактировать</span>
              <i class="fa-solid fa-pencil "></i>
            </AtomsButton>
            <AtomsButton outlined @click="onExit">
              <span class="mr-3">Выход</span>
              <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </AtomsButton>
          </div>
        </div>
        <AtomsLine class="my-4 lg:my-6" />
        <div class="flex items-center mb-3">
          <h3 class="font-bold mr-2">Компетенции</h3>
          <i class="far fa-circle-question text-xs text-gray2"></i>
        </div>
        <div class="gap-1 flex flex-wrap items-start">
          <AtomsChip
            v-for="(tag, i) in profile.competencies"
            :key="tag.codeId"
            :color="tag.color"
          >
            {{ tag.title }}
          </AtomsChip>
        </div>
      </div>
      <div class="profile__container max-lg:rounded-b-xl lg:rounded-br-xl flex-grow">
        <History
          :history="history"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useProfileStore } from '@/stores/profile';
import TMediaObject from '@/types/TMediaObject';
import { useAuthStore } from '@/stores/auth';
import TProfile, { Profile, ProfileDTO } from '~~/types/TProfile';

const { $dayjs } = useNuxtApp();

const profileStore = useProfileStore();

const route = useRoute();

const router = useRouter();

const authStore = useAuthStore();

const isMe = route.name !== 'me';

const id = route.params.codeId as string ?? authStore.user?.id ?? '';

if (!id) {
  router.push('/');
}

const fetches = [];

const profile = ref(new Profile());

if (isMe) {
  profile.value = new ProfileDTO(authStore.profile);
} else {
  const profileSync = useAsyncData<TProfile>(async () => {
    const res = await profileStore.fetchProfile(id);
    return res;
  })
    .then((sync) => {
      profile.value = new ProfileDTO(sync.data?.value);
      return sync;
    });

  fetches.push(profileSync);
}

await Promise.allSettled(fetches);

const fullname = computed(() => {
  const nameParts = [profile.value.firstName, profile.value.lastName].filter((item) => !!item);
  return nameParts.join(' ');
});

const birthsday = computed(() => {
  return $dayjs().diff($dayjs(profile.value.birthsday), 'year');
});

const created = computed(() => {
  return $dayjs(profile.value.createdAt).fromNow();
});

const createdAt = computed(() => {
  return $dayjs(profile.value.createdAt).format('DD MMM YYYY');
});

const mainCompetence = computed(() => {
  return profile.value.getMainCompetence();
});

const totalIdeas = computed<number>(() => {
  return (profile.value?.ownIdeasCount ?? 0) + (profile.value?.ideasCount ?? 0);
});

const history: TMediaObject[] = Array(5).fill(
  {
    codeId: 'one',
    title: 'Title',
    author: {
      name: 'Author1',
      photoUrl: 'https://placeimg.com/180/180/people',
    },
    message: 'Визуальное решение железнодорожных путей ',
    createdAt: '2022-11-11T12:12:45',
  },
);

const onEdit = () => {
  router.push({ name: 'edit-profile' });
};

const tokenCookie = useCookie('token');
const onExit = () => {
  tokenCookie.value = '';
  authStore.logout();
  router.push('/');
}
</script>