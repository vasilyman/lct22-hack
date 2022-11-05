<template>
  <div class="flex gap-3">
    <div class="">
      <div class="flex flex-col justify-start gap-3 lg:gap-5 sticky top-3">
        <AtomsButton color="text" :to="{ hash: '#main', replace: true }">
          <i class="fas fa-align-justify"></i>
        </AtomsButton>
        <AtomsButton color="text" :to="{ hash: '#documents', replace: true }">
          <i class="fas fa-file"></i>
        </AtomsButton>
        <AtomsButton color="text" :to="{ hash: '', replace: true }">
          <i class="fas fa-chevron-up"></i>
        </AtomsButton>
      </div>
    </div>
    <div class="flex flex-col flex-1 gap-3">
      <div
        id="main"
        class="profile__container rounded-t-xl"
      >
        <FormIdeaDescription v-model="ideaDescription"/>
      </div>
      <div
        id="documents"
        class="profile__container rounded-b-xl"
      >
        
        <FormIdeaDocuments
          v-model="ideaDocuments"
        />
      </div>
      <div class="flex justify-end gap-3">
        <AtomsButton
          color="gray"
          outlined
          @click="onReset"
        >
          Отменить
        </AtomsButton>
        <AtomsButton
          @click="onSave"
        >
          Сохранить
        </AtomsButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { TFormIdeaDescription, TFormIdea, FormIdea } from '@/types/TFormIdea';
import TDocument from '~~/types/TDocument';
import { useIdeaStore } from '@/stores/idea';

const ideaDescription = reactive<TFormIdeaDescription>({
  title: '',
  description: '',
});

const ideaDocuments = reactive<TDocument[]>([]);

const ideaStore = useIdeaStore();

const router = useRouter();

const onSave = () => {
  const form = new FormIdea(ideaDescription);

  ideaStore.createIdea(form)
    .then(() => {
      clearNuxtData();
      router.push('/');
    })
    .catch((e) => {
      console.log(e);
    });
};

const onReset = () => {
//
};

onUnmounted(() => {
  clearNuxtData();
});
</script>