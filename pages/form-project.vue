<template>
  <div class="flex gap-3">
    <div class="">
      <div class="flex flex-col justify-start gap-3 lg:gap-5 sticky top-3">
        <AtomsButton color="text" :to="{ hash: '#main', replace: true }">
          <i class="fas fa-align-justify"></i>
        </AtomsButton>
        <AtomsButton color="text" :to="{ hash: '#properties', replace: true }">
          <i class="fas fa-check-double"></i>
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
        <FormIdeaDescription
          v-model:title="ideaForm.title"
          v-model:description="ideaForm.description"
        />
      </div>
      <div
        id="properties"
        class="profile__container rounded-t-xl"
      >
        <FormIdeaCategory
          v-model:categories="ideaForm.tags"
          v-bind:competencies="ideaForm.competencies"
        />
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
import TIdeaCard, { IdeaCard, IdeaCardDTO } from '~~/types/TIdeaCard';

const route = useRoute();

const codeId = ref<string>(route.params.codeId as string);

const ideaForm = ref<TFormIdea>(new FormIdea());

const ideaDocuments = reactive<TDocument[]>([]);

const ideaStore = useIdeaStore();

const router = useRouter();

const onSave = () => {

  if (codeId.value) {
    // edit mode
    ideaStore.updateIdea(ideaForm.value)
      .then(() => {
        clearNuxtData();
        router.push({ name: 'project-codeId', params: { codeId: codeId.value }});
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    // new mode
    ideaStore.createIdea(ideaForm.value)
      .then(() => {
        clearNuxtData();
        router.push('/');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  
};

const onReset = () => {
  router.back();
};

const fethces = [];

/**
 * editing project
 */
if (codeId.value) {
  // clearNuxtData();
  const ideaSync = useAsyncData<TIdeaCard>(async () => {
    const res = await ideaStore.fetchIdea(codeId.value);
    return res;
  })
    .then(({ data }) => {
      if (!data.value) throw createError({ statusCode: 404 });

      const idea = new IdeaCardDTO(data.value);

      ideaForm.value.id = codeId.value;
      ideaForm.value.title = idea.title;
      ideaForm.value.description = idea.description;
      ideaForm.value.tags = idea.tags;
      ideaForm.value.competencies = idea.competencies;
    });

  fethces.push(ideaSync);
}


/**
 * fetching
 */
if (fethces.length > 0) await Promise.allSettled(fethces);
</script>