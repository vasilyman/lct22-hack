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
              v-if="step === 0"
              v-model="email"
              placeholder="@"
              class="mb-4"
              autofocus
              name="email"
              @keyup.enter="onNext"
            />
            <div v-else>
              <div
                class="text-center p-2 cursor-pointer"
                title="Редактировать"
                @click="onBack"
              >{{ email }}</div>
              <AtomsInputText
                v-model="password"
                placeholder="Пароль"
                class="mb-4"
                type="password"
                autofocus
                name="password"
                @keyup.enter="onNext"
              />
            </div>
          </Transition>
        </div>
        <AtomsButton class="w-full" @click="onNext">
          Дальше
        </AtomsButton>
      </div>
      <AtomsLine class="my-8"/>
      <div class="h-40"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/app';
import TLogin from '@/types/TLogin';
import { useAuthStore } from '@/stores/auth';

definePageMeta({
  middleware: ["auth-deny"]
})

const authStore = useAuthStore();

const isAuthorized = computed(() => authStore.isAuthorised);
const appStore = useAppStore();
const dark = computed(() => appStore.dark);

const email = ref('');
const password = ref('');
const step = ref(0);

const router = useRouter();
const tokenCookie = useCookie('token');

const onNext = async () => {
  if (email.value && step.value === 0) step.value = 1;

  if (email.value && password.value && step.value === 1) {
    await authStore.login({ email: email.value, password: password.value })
      .then((token) => {
        tokenCookie.value = token || "";
        router.push('/');
      })
      .catch((e) => {
        console.log(e);
      });
  }
}

const onBack = () => {
  step.value = step.value !== 0 ? step.value -= 1 : 0;
}
</script>