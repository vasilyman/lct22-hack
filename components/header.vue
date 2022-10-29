<template>
  <div class="flex items-center w-full ">
    <AtomsButton
      v-if="route.path !== '/'"
      class="mr-3"
      color="transparent"
      @click="onBack"
    >
      <i class="fas fa-arrow-left text-xl"></i>
      <div class="hidden :lg:block ml-3">Назад</div>
    </AtomsButton>
    <div
      class="hover:shadow-md h-8 w-8 rounded-full flex justify-center items-center transition-all duration-300 cursor-pointer"
      @click="onToggleDarkMode"
    >
      <i class="fas fa-moon"></i>
    </div>
    <div class="flex-1"></div>
    <AtomsButton class="lg:mr-10 mr-3">
      Добавить идею
    </AtomsButton>
    <div
      v-if="isAuthorized"
      class="flex items-center cursor-pointer"
      @click="onLogin"
    >
      <div class="mr-3 text-right lg:block hidden">
        <div><strong>Екатерина К.</strong></div>
        <div class="text-xs">UX/UI дизайнер</div>
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

const route = useRoute();

const authStore = useAuthStore();

const isAuthorized = computed(() => authStore.isAuthorised);

const props = defineProps({
  dark: { type: Boolean },
});

interface Emits {
  (e: 'update:dark', dark: boolean): void,
}
const emit = defineEmits<Emits>();

const router = useRouter();

const onToggleDarkMode = () => {
  emit('update:dark', !props.dark);
};

const onLogin = () => {
  router.push('/profile');
};

const onBack = () => {
  router.back();
};
</script>