<template>
  <div class="video__item " :class="{'list' : list }">
    <img class="video__img" :src="`${itemVideo.thumbnails.medium.url}`" :alt="itemVideo.title"/>

    <div class="item__span " :class="{'list' : list }">
      <p>{{ itemVideo.title.substring(0, 50) + '..' }}</p>
      <span>{{ itemVideo.channelTitle.substring(0, 20) + '..' }}</span>
      <span>786 тыс. просмотров</span>
    </div>
  </div>
</template>

<script>
import VideoPreview from "@/components/UI/testUI/videoPreview/videoPreview";

export default {
  name: "videoItem",
  props: {
    list: [Boolean],
    itemVideo: {
      type: Object,
      required: true
    }
  },
  components: {VideoPreview},
}
</script>

<style lang="scss" scoped>
.video {
  &__img {
    width: 245px;
    height: 140px;
    background-size: cover;
    border-radius: 10px;
  }

  &__item.list {
    display: flex;

    p {
      width: 500px;
      font-size: 16px;
      line-height: 20px;
    }
  }

  &__item {
    margin-bottom: 30px;

    p {
      width: 250px;
      margin: 8px 0;
      font-weight: 500;
      color: #272727;
    }

  }


}

.item__span.list {
  margin-left: 20px;
  font-size: 16px;
  line-height: 20px;
}

.item {
  &__span {
    display: flex;
    flex-direction: column;

  }
}

@media screen and (max-width: 768px) {
  .video__item {
    width: 235px;
  }
  .video__item.list {

    p {
      width: 490px;
    }
  }
  .video__img {
    width: 216px;
    height: 138px;
  }
}

@media screen and (max-width: 320px) {
  .video__item {
    width: 303px;



    p {
      width: 303px;
    }

  }
  .video__item.list {
    align-items: center;
    width: 179px;
    img{
      min-width: 120px;
      width: 120px;
      height: auto;
      max-height: 71px;
    }
    p {
      width: 169px;
      font-size: 14px;
    }

    span {
      font-size: 14px;
    }
  }
  .video__img {
    width: 303px;
    height: auto;
    max-height: 171px;
  }
}


</style>