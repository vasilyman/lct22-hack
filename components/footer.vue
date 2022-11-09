<template>
  <div class="p-3 text-center text-gray2/30 text-xs">
    Версия приложения: {{ version }}
  </div>
</template>
<script lang="ts" setup>
const config = useRuntimeConfig();

const version = config.version;
</script>