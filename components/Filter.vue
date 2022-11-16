<template>
  <div class="flex">
    <div class="flex-1"></div>
    <button
      class=""
      @click="toggleFilter"
    ><strong>{{ props.title }}</strong></button>
  </div>
  <AtomsModal v-model="showFilter">
    <h1 class="text-xl mb-4">{{ props.title }}</h1>
    <div class="my-3 flex flex-col gap-3">
      <AtomsInputText modelValue="Иван" label="Автор" />
      <AtomsCheckbox :modelValue="true" label="Инновационный"/>
      <AtomsInputText modelValue="команда укомплектована" label="Статус" />
      <AtomsInputText modelValue="Инженер BIM, Маркетолог" label="Компетенции" />
      <AtomsInputText modelValue="BIM системы" label="Тематика" />
      <AtomsInputText modelValue="Инноваторы москвы" label="Подходящая МГП" />
    </div>
    <div class="flex gap-3 justify-end">
      <AtomsButton small>Применить</AtomsButton>
      <AtomsButton small>Сбросить</AtomsButton>
    </div>
  </AtomsModal>
</template>
<script lang="ts" setup>
const props = defineProps({
  title: { type: String, default: '' },
});

const showFilter = ref(false);

const toggleFilter = () => {
  showFilter.value = !showFilter.value;
};
</script>