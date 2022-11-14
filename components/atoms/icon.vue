<template>
  <i
    class="icon"
    :class="{
      'icon_expert': props.name === 'expert',
    }"
  />
</template>
<script lang="ts" setup>
const props = defineProps({
  name: { type: String },
})
</script>
<style lang="postcss">
.icon {
  width: 1rem;
  height: 1rem;
  display: inline-block;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &_expert {
    &::before {
      background-image: url('@/assets/img/icons/expert.svg');
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
}  
</style>