<template>
  <div class="flex gap-3">
    <div class="">
      <div class="flex flex-col justify-start gap-3 lg:gap-5 sticky top-3">
        <AtomsButton color="text" :to="{ hash: '', replace: true }">
          <i class="fas fa-chevron-up"></i>
        </AtomsButton>
      </div>
    </div>
    <div class="flex flex-col flex-1 gap-3">
      <div
        id="main"
        class="profile__container rounded-xl"
      >
        <AtomsInputText
          label="Имя"
          class="mb-3"
          v-model="profileForm.firstName"
        />
        <AtomsInputText
          label="Фамилия"
          class="mb-3"
          v-model="profileForm.lastName"
        />
        <AtomsSelect
          label="Город"
          class="mb-3"
          name="city"
          :items="cities"
          v-model="selCity"
        />
        <AtomsSelect
          label="Навыки / компетенции"
          class="mb-3"
          name="competencies"
          :items="competencies"
          clear-after-select
          @select="onSelectCompetence"
        />
        {{ selectedCompetencies }}
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
import TProfile, { Profile } from '@/types/TProfile';
import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '~~/stores/profile';
import TCompetence, { Competence, TCompetenceUser } from '~~/types/TCompetence';
import { useCompetenceStore } from '~~/stores/competence';
import { useCityStore } from '@/stores/city';
import { City, TCity } from '~~/types/TCity';

const profileForm = ref<TProfile>(new Profile());

const authStore = useAuthStore();

const profileStore = useProfileStore();

const profile = computed<TProfile>(() => {
  return new Profile(authStore.profile);
});

const competenceStore = useCompetenceStore();
const cityStore = useCityStore();

const storeCompetencies = computed(() => {
  return competenceStore.competencies.map((item) => new Competence(item));
});


if (competenceStore.competencies.length === 0) {
  competenceStore.fetchList({});
}

if (cityStore.cities.length === 0) {
  cityStore.fetchList({});
}

const competencies = computed(() => {
  return competenceStore.competencies.map((item: TCompetence) => {
    const competence = new Competence(item);
    return {
      value: competence.codeId,
      title: competence.title,
    };
  });
});

const cities = computed(() => {
  return cityStore.cities.map((item: TCity) => {
    const city = new City(item);
    return {
      value: city.codeId,
      title: city.title,
    };
  });
});

watchEffect(() => {
  profileForm.value = profile.value;
})

const selCity = computed({
  get() {
    return profileForm.value.city?.codeId;
  },
  set(val) {
    profileForm.value.city = cityStore.cities.find((item) => item.codeId === val);
  },
});

const searchCompetence = ref('');

const selectedCompetencies = ref<TCompetenceUser[]>(profileForm.value.competencies.sort((a, b) => a.ordered - b.ordered));

watch(() => profileForm.value.competencies, (val) => {
  selectedCompetencies.value = val;
});

const onSelectCompetence = (val: string) => {
  const competence = storeCompetencies.value.find((item) => item.codeId === val);
  if (competence) {
    const maxOrder = profileForm.value.competencies.sort((a, b) => b.ordered - a.ordered)[0].ordered;
    const order = maxOrder + 1;
    selectedCompetencies.value.push({
      ...competence,
      ordered: order,
      is_expert: false,
      tested_At: '',
    });
  }
};

const router = useRouter();

const onSave = () => {
  profileStore.update(profile.value.id, profileForm.value)
    .then(() => {
      clearNuxtData();
      // router.push({ name: 'profile', params: { codeId: profile.value?.id }});
    })
    .catch((e) => {
      console.log(e);
    });
};

const onReset = () => {
  router.back();
};

</script>