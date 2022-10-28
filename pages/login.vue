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
              v-if="form.email === ''"
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
      <div class="line mt-8"></div>
      <div class="h-40"></div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useAppStore } from '@/stores/app';

const appStore = useAppStore();
const dark = computed(() => appStore.dark);

const email = ref('');
const password = ref('');

const form = ref({
  email: '',
  password: '',
});

const onNext = () => {
  if (email.value !== '') {
    if (password.value === '') {
      form.value.email = email.value;
    } else {
      form.value.password = password.value;
      console.log(form.value);
    }
  }
}
</script>