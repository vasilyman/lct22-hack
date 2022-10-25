<template>
  <div class="flex items-center w-full">
    <div class="flex-1"></div>
    <AtomsButton class="mr-10" large>
      Добавить идею
    </AtomsButton>
    <div class="flex items-center cursor-pointer" @click="onLogin">
      <div class="mr-3"><strong>Екатерина К.</strong></div>
      <AtomsAvatar />
    </div>
  </div>
</template>
<script lang="ts" setup>
const router = useRouter();


const onLogin = () => {
  router.push({ name: 'login' });
};
</script>