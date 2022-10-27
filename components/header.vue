<template>
  <div class="flex items-center w-full">
    <div
      class="hover:shadow-md h-8 w-8 rounded-full flex justify-center items-center transition-all duration-300 cursor-pointer"
      @click="onToggleDarkMode"
    >
      <i class="fas fa-moon"></i>
    </div>
    <div class="flex-1"></div>
    <AtomsButton class="mr-10">
      Добавить идею
    </AtomsButton>
    <div class="flex items-center cursor-pointer" @click="onLogin">
      <div class="mr-3 text-right">
        <div><strong>Екатерина К.</strong></div>
        <div class="text-xs">UX/UI дизайнер</div>
      </div>
      <AtomsAvatar />
    </div>
  </div>
</template>
<script lang="ts" setup>
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
  router.push('/login');
};
</script>