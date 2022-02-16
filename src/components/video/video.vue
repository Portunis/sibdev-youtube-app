<template>
  <div class="video__items " :class="{'list' : list }">
    <VideoItem v-for="itemVideo in getVideo" :itemVideo="itemVideo" :list="list" />

  </div>

</template>

<script>

import VideoItem from "@/components/video/videoItem";
export default {
  name: "video",
  components: {VideoItem},
  props: {
    list: [Boolean],
    getVideo: [Array]
  },

}
</script>

<style lang="scss" scoped>
.video{
  &__items{
    display: grid;
    grid-template-columns: repeat(4, 1fr) ;
    grid-auto-rows: 275px;
    justify-items: center;
  }
  &__items.list{
    display: block;
    grid-template-columns: 100%;
  }

}

</style>