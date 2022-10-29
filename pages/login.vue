<template>
  <div class="w-full h-full flex justify-center items-center">
    <div class="shadow-xl px-6 w-96 max-w-full rounded-xl border-gray border">
      <div class="">
        <img
          v-if="dark"
          class="my-10 mx-auto"
          src="@/assets/img/logo_dark.png"
          alt=""
        >
        <img
          v-else
          class="my-10 mx-auto"
          src="@/assets/img/logo.png"
          alt=""
        >
        <div class="text-center mb-4">Войдите, чтобы продолжить</div>
        <div class="overflow-hidden">
          <Transition name="slide-left" mode="out-in" >
            <AtomsInputText
              v-if="credentials.email === ''"
              v-model="email"
              placeholder="@"
              class="mb-4"
            />
            <AtomsInputText
              v-else
              v-model="password"
              placeholder="Пароль"
              class="mb-4"
              type="password"
            />
          </Transition>
        </div>
        <AtomsButton class="w-full" @click="onNext">
          Дальше
        </AtomsButton>
      </div>
      <AtomsLine />
      <div class="h-40"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
import TLogin from '@/types/TLogin';
import { useAuthStore } from '@/stores/auth';

definePageMeta({
  middleware: ["auth"]
})

const authStore = useAuthStore();

const isAuthorized = computed(() => authStore.isAuthorised);
const credentials = computed(() => authStore.credentials);

const appStore = useAppStore();
const dark = computed(() => appStore.dark);

const email = ref('');
const password = ref('');

const form = ref<TLogin>({
  email: '',
  password: '',
});

const router = useRouter();

const onNext = () => {
  if (email.value !== '') {
    if (!password.value) {
      authStore.credentials.email = email.value;
    } else {
      authStore.credentials.password = password.value;
      authStore.login();
      router.push('/');
    }
  }
}
</script>