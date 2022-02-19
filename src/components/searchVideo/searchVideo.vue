<template>
<div>
  <div v-if="!GET_VIDEOS.length" class="search">
    <h2>Поиск видео</h2>
    <div class="search-box">
      <UiInput type="text" class="search-box__input" placeholder="Что хотите посмотреть ?" v-model:model-value="post.title" />
      <ui-button class="search-box__button" @click="searchVideo">Найти</ui-button>
    </div>
  </div>
  <ResultSearch v-if="GET_VIDEOS.length"   :getVideo="GET_VIDEOS"/>
</div>
</template>

<script>
import UiInput from "@/components/UI/input/uiInput";
import UiButton from "@/components/UI/button/uiButton";
import ResultSearch from "@/components/searchVideo/resultSearch";
import {mapActions, mapGetters} from "vuex"
export default {
  name: "searchVideo",
  components: {ResultSearch, UiButton, UiInput},
  data(){
    return{
      post:{
        title: '',
        maxResults: 12
      }
    }
  },
  computed: {
    ...mapGetters([
        'GET_VIDEOS'
    ])
  },
  methods:{
    ...mapActions({
      fetchAPI: 'fetchAPI',

    }),
    searchVideo(){
      const nameVideo = this.post
      this.fetchAPI(nameVideo)

    },
  }
}
</script>

<style lang="scss" scoped>
h2{
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 52px;
  /* identical to box height, or 144% */
  text-align: center;
  color: #000000;
  margin: 40px 0;

}
.search{
  margin: 180px 0;
}
.search-box{
  display: flex;
  justify-content: center;

  &__input{
   margin: 0;
    border-radius: 10px 0 0 10px;
    width: 686px;
  }
  &__button{
    margin: 0;
    border-radius: 0 10px 10px 0;
  }
}
</style>