<template>

  <Vue3Lottie  :animationData="Loading" :height="200" :width="200" />
    <div class="loader__title"><p><slot></slot></p></div>


</template>

<script>
import Loading from '@/assets/animationLottie/loading.json'

export default {
  name: "uiLoading",
 data(){
    return{
      Loading,
    }
 }
}
</script>

<style lang="scss" scoped>
.loader__title{
  p{
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    color: #272727;
    text-align: center;

  }
}
.lottie-animation-container{
  margin: 0 auto;
}
</style>