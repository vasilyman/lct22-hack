<template>
  <div class="flex items-center w-full ">
    <AtomsButton
      v-if="route.path !== '/'"
      class="mr-3"
      color="text"
      @click="onBack"
    >
      <i class="fas fa-arrow-left text-xl"></i>
      <div class="hidden :lg:block ml-3">Назад</div>
    </AtomsButton>
    <div class="flex-1"></div>
    <AtomsButton
      v-if="canAdd"
      class="lg:mr-10 mr-3"
      @click="onAdd"
    >
      Добавить идею
    </AtomsButton>
    <AtomsToggle
      v-model="localDark"
      theme-switcher 
      class="lg:mr-10 mr-3"
    />
    <AtomsButton
      v-if="canViewNotify"
      color="text"
      class="lg:mr-10 mr-3"
    >
      <i class="far fa-bell"></i>
    </AtomsButton>
    <div
      v-if="isAuthorized"
      class="flex items-center cursor-pointer"
      @click="onLogin"
    >
      <div class="mr-3 text-right lg:block hidden">
        <div><strong>{{ fullName }}</strong></div>
        <div class="text-xs">{{ mainCompetence }}</div>
      </div>
      <AtomsAvatar />
    </div>
    <AtomsButton
      v-else
      to="/login"
    >
      Вход
    </AtomsButton>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { Profile } from '@/types/TProfile';

const route = useRoute();

const authStore = useAuthStore();

const profile = computed(() => {
  return new Profile(authStore.profile);
});

const mainCompetence = computed(() => {
  return profile.value.getMainCompetence();
});

const fullName = computed(() => {
  return profile.value.getFullName();
});

const isAuthorized = computed(() => authStore.isAuthorised);

const props = defineProps({
  dark: { type: Boolean },
});

interface Emits {
  (e: 'update:dark', dark: boolean): void,
}
const emit = defineEmits<Emits>();

const router = useRouter();

const localDark = computed({
  get() {
    return props.dark
  },
  set(val) {
    emit('update:dark', val);
  }
})

const onLogin = () => {
  router.push({ name: 'me' });
};

const onBack = () => {
  let nextRoute: string = '';
  switch (route.name) {
    case 'project-codeId':
      nextRoute = 'index';
      break;
    case 'edit-project':
      nextRoute = 'project-codeId';
      break;
    default:
      break;
  }
  if (nextRoute !== '') {
    router.replace({ name: nextRoute });
  } else router.back();
};

const onAdd = () => {
  router.push('new-project');
}

const canAdd = computed(() => {
  return authStore.isAuthorised && !['new-project', 'edit-project', 'project-codeId'].includes(route.name as string ?? '');
});
const canViewNotify = computed(() => authStore.isAuthorised);
</script>