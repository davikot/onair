<script lang="ts" setup>
import { useRadioStore } from "@/stores/radio.js";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import Item from "@/components/Item.vue";

const radioStore = useRadioStore();
const { playingItems, historyItems } = storeToRefs(radioStore);

const items = computed(() => [...playingItems.value, ...historyItems.value]);
</script>

<template>
  <div class="items">
    <template v-for="(item, i) in items" :key="i">
      <Item :item="item" />
    </template>
  </div>
</template>
