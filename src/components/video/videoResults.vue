<template>
  <div class="video__items " :class="{'list' : list }">
    <VideoItem v-for="itemVideo in getVideo" :key="itemVideo.id" :itemVideo="itemVideo" :list="list" />

  </div>

</template>

<script>

import VideoItem from "@/components/video/videoItem";
export default {
  name: "videoResults",
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
@media screen and (max-width: 768px){
  .video__items{
    grid-template-columns: repeat(3, 1fr) ;
  }
  .video__item.list{
    p{
      width: 510px;
    }
  }
}
@media screen and (max-width: 320px){
  .video__items{
    grid-template-columns: repeat(1, 1fr);
    grid-auto-rows: 303px;
  }
  .video__item.list{
    p{
      width: 510px;
    }
  }
}
</style>