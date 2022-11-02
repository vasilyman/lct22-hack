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
          {{ mainCompetition }}
        </div>
        <div class="flex w-full mb-4">
          <div class="flex-grow text-center flex flex-col justify-between">
            <div class="">
              <img class="mx-auto" src="@/assets/img/brain.png" alt="">
            </div>
            <div class="flex items-center justify-center"><span><strong class="text-md mr-1">15</strong></span><span class="text-sm">идей</span></div>
          </div>
          <AtomsLine vertical />
          <div class="flex-grow text-center flex flex-col justify-between">
            <div class="flex mx-auto items-center">
              <span><strong class="text-md mr-1">15</strong></span>
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
            {{ profile.city.title }}
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
            v-for="(tag, i) in profile.competitions"
            :key="tag.codeId"
            :color="getColor(i)"
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
import { TThemeColor } from '@/types/TThemeColor';
import TMediaObject from '@/types/TMediaObject';
import { useAuthStore } from '@/stores/auth';

const { $dayjs } = useNuxtApp();

const profileStore = useProfileStore();

const id = '1'

const profile = await profileStore.fetchProfile(id);

const fullname = computed(() => profileStore.fullname(profile));

const birthsday = $dayjs().diff($dayjs(profile.birthsday), 'year');

const created = $dayjs(profile.createdAt).fromNow();

const createdAt = $dayjs(profile.createdAt).format('DD MMM YYYY');

const getColor = (i: number): TThemeColor => {
  const colors: TThemeColor[] = ['white', 'success', 'danger', 'info', 'primary', 'warning'];
  return colors[i % colors.length];
};

const mainCompetition = profile.competitions.find((item) => item.isMain)?.title;

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
  //
}

const tokenCookie = useCookie('token');
const authStore = useAuthStore();
const router = useRouter();
const onExit = () => {
  tokenCookie.value = '';
  authStore.logout();
  router.push('/');
}
</script>