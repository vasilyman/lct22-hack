<template>
  <div class="flex flex-row gap-3">
    <div class="basis-1 md:basis-1/3 flex flex-col gap-3">
      <div class="profile__container rounded-tl-xl">
        Photo
      </div>
      <div class="profile__container rounded-bl-xl">
        Вы приняли участие в проекте
      </div>
    </div>
    <div class="basis-1 md:basis-2/3 flex flex-col gap-3">
      <div class="profile__container rounded-tr-xl">
        Info
      </div>
      <div class="profile__container rounded-br-xl">
        Timeline
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useProfileStore } from '@/stores/profile';

const profileStore = useProfileStore();
</script>