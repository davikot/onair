<script lang="ts" setup>
import type { Item } from "@/stores/radio";
import { computed, toRefs } from "vue";
import { getItemPlayedTime, getPlayedPercentage } from "@/utils";

interface Props {
  item: Item;
}

const props = defineProps<Props>();
const { item } = toRefs(props);

const isPlaying = computed(() => item.value.status === "playing");
const time = computed(() => new Date(item.value.time).toLocaleTimeString());
const played = computed(() => getItemPlayedTime(item.value));
const percentage = computed(() => getPlayedPercentage(item.value));
</script>

<template>
  <div class="item content-padding" :class="{ 'item--playing': isPlaying }">
    <div class="item-image">
      <img
        :src="
          item.imageUrl ||
          'https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM='
        "
        alt="Item Image"
      />
    </div>
    <div class="item-details">
      <div class="item-details__title">{{ item.title }}</div>
      <div class="item-details__artist">{{ item.artist }}</div>
      <div class="item-details__time">Started at {{ time }}</div>
      <a
        target="_blank"
        :href="item.iTunesTrackUrl"
        class="item-details__album"
      >
        Open album
      </a>
    </div>
    <template v-if="isPlaying">
      <div class="item-progress">
        <div class="item-progress__played">{{ played }}</div>
        <div class="item-progress-bar">
          <div class="item-progress-bar__full"></div>
          <div
            :style="{ width: `${percentage}%` }"
            class="item-progress-bar__filled"
          ></div>
        </div>
        <div class="item-progress__duration">
          {{ item.duration }}
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss">
@import "../assets/item.scss";
</style>
