<script setup lang="ts">
import { RouterView } from "vue-router";
import { useRadioStore } from "@/stores/radio";
import { onMounted } from "vue";

const { fetchItems, startWatchingItems } = useRadioStore();

onMounted(() => {
  fetchItems();
  startWatchingItems();
});
</script>

<template>
  <RouterView />
</template>
