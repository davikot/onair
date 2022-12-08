import type { Ref } from "vue";
import { computed, ref } from "vue";
import { defineStore } from "pinia";

export interface Item {
  artist: string;
  duration: string;
  iTunesTrackUrl: string;
  imageUrl: string;
  previewUrl: string;
  status: "playing" | "history";
  time: string;
  title: string;
}

const API_URL = "https://onair.radioapi.io/thisisgo/go/onair.json";

export const useRadioStore = defineStore("radio", () => {
  const items: Ref<Item[]> = ref([]);
  const intervalId: Ref<undefined | number> = ref(undefined);

  const playingItems = computed(() =>
    items.value.filter((item) => item.status === "playing")
  );

  const historyItems = computed(() =>
    items.value
      .filter((item) => item.status === "history")
      .sort((a, b) => +new Date(b.time) - +new Date(a.time))
  );

  function fetchItems() {
    fetch(API_URL)
      .then((r) => r.json())
      .then((r) => r.nowplaying)
      .then((r) => (items.value = r));
  }

  function startWatchingItems() {
    intervalId.value = setInterval(() => {
      fetchItems();
    }, 2 * 1000);
  }

  function stopWatchingItems() {
    clearInterval(intervalId.value);
  }

  return {
    items,
    playingItems,
    historyItems,
    fetchItems,
    startWatchingItems,
    stopWatchingItems,
  };
});
