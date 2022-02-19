<template>
  <div class="resultSearch">
    <h2>Поиск видео</h2>
    <div class="search">

      <UiInput type="text" class="search__input"  v-model:model-value="post.title"  placeholder="Что хотите посмотреть ?" />
      <div @click="showDialog" class="search__favorite">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M20.8401 4.60999C20.3294 4.099 19.7229 3.69364 19.0555 3.41708C18.388 3.14052 17.6726 2.99817 16.9501 2.99817C16.2276 2.99817 15.5122 3.14052 14.8448 3.41708C14.1773 3.69364 13.5709 4.099 13.0601 4.60999L12.0001 5.66999L10.9401 4.60999C9.90843 3.5783 8.50915 2.9987 7.05012 2.9987C5.59109 2.9987 4.19181 3.5783 3.16012 4.60999C2.12843 5.64169 1.54883 7.04096 1.54883 8.49999C1.54883 9.95903 2.12843 11.3583 3.16012 12.39L4.22012 13.45L12.0001 21.23L19.7801 13.45L20.8401 12.39C21.3511 11.8792 21.7565 11.2728 22.033 10.6053C22.3096 9.93789 22.4519 9.22248 22.4519 8.49999C22.4519 7.77751 22.3096 7.0621 22.033 6.39464C21.7565 5.72718 21.3511 5.12075 20.8401 4.60999V4.60999Z"
              stroke="#1390E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

      </div>
      <transition name="notification">
      <UiNotification  v-if="notification" class="notification__saveSearch">

        <p>Поиск сохранён в разделе «Избранное»</p>
        <router-link to="/favorite">Перейти в избранное</router-link>
      </UiNotification>
      </transition>
      <ui-button @click="searchVideo" class="search__button">Найти</ui-button>
      <transition name="notification">
      <Modal v-model:show="dialogVisible" >
        <SaveSearchRequest :searchRequest="resultNameVideo" @create="createFavoritesQuery"  @closeModal="closeDialog"/>
      </Modal>
      </transition>
    </div>
    <div class="results">
      <div class="results__filter">
        <div class="results__query">
          <p>Видео по запросу <strong>"{{resultNameVideo}}"</strong></p>
          <span>{{countSearchVideo}}</span>
        </div>
        <div class="results__view">

          <svg @click="listActive" width="24" height="24" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g >
              <path d="M8 6H21" stroke="#272727" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 12H21" stroke="#272727" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M8 18H21" stroke="#272727" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 6H3.01" stroke="#272727" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 12H3.01" stroke="#272727" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 18H3.01" stroke="#272727" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>


          </svg>


          <svg @click="listDisable" width="24" height="24" viewBox="0 0 24 24" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <g >
            <path d="M10 5H5V10H10V5Z" stroke="#272727" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M19 5H14V10H19V5Z" stroke="#272727" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M19 14H14V19H19V14Z" stroke="#272727" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
            <path d="M10 14H5V19H10V14Z" stroke="#272727" stroke-width="2" stroke-linecap="round"
                  stroke-linejoin="round"/>
            </g>

          </svg>

        </div>
      </div>
      <VideoResults v-if="!isLoading"  :getVideo="getVideo" :list="listOn"/>
      <div v-if="isLoading">Загружаю</div>
    </div>
  </div>
</template>

<script>
import UiInput from "@/components/UI/input/uiInput";
import UiButton from "@/components/UI/button/uiButton";
import VideoPreview from "@/components/UI/testUI/videoPreview/videoPreview";

import Modal from "@/components/UI/modal/modal";
import SaveSearchRequest from "@/components/modalCustom/saveSearchRequest";
import { mapActions, mapState} from 'vuex'
import UiNotification from "@/components/UI/notification/uiNotification";
import VideoResults from "@/components/video/videoResults";

export default {
  name: "resultSearch",
  components: {VideoResults, UiNotification, SaveSearchRequest, Modal, VideoPreview, UiButton, UiInput},
  data() {
    return {
      listOn: false,
      dialogVisible: false,
      post:{
        title: '',
        maxResults: 12
      },
      notification: false,
    }
  },
  props: {
    getVideo: {
      type: Array,
      default: true
    }
  },
  computed:{
    ...mapState({
      resultNameVideo: state => state.nameVideo,
      countSearchVideo: state => state.countVideoSearch,
      isLoading: state => state.isLoading
    })
  },
  methods: {
    ...mapActions({
      fetchAPI: 'fetchAPI',
      saveSearch: 'saveSearchRequest'

    }),
    createFavoritesQuery(savePost){
      this.saveSearch(savePost)
      this.dialogVisible = false;
      this.notification = true;
      setTimeout(()=>{
        this.notification = false;
      }, 5000)
    },
    searchVideo(){
      console.log('search:',this.post)
      const nameVideo = this.post
      this.fetchAPI(nameVideo)


    },
    closeDialog(){
      this.dialogVisible = false;
    },
    showDialog() {
      this.dialogVisible = true;
      console.log('модал')
    },
    listActive() {
      this.listOn = true;
      console.log('ЛИСТ')
    },
    listDisable() {
      this.listOn = false;
      console.log('GRID')
    }

  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 52px;
  text-align: left;
  color: #000000;
  margin: 40px 0 12px;

}

p {
  font-size: 16px;
  line-height: 24px;
  color: #272727;
}

.search {
  display: flex;
  justify-content: center;
  position: relative;

  &__favorite {
    position: absolute;
    top: 15px;
    right: 200px;
    cursor: pointer;
  }

  &__input {
    margin: 0;
    border-radius: 10px 0 0 10px;
    width: 100%;
  }

  &__button {
    margin: 0;
    border-radius: 0 10px 10px 0;
  }
}

.results {
  &__filter {
    margin: 40px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__query {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    p {
      margin: 0 15px 0 0;

    }
  }

  &__view {
    svg {
      margin-left: 15px;
      cursor: pointer;
    }
  }

}


.notification{




  &__saveSearch{
    position: absolute;
    right: 67px;
    top: 49px;

    padding: 15px 15px;

   p{
     font-size: 16px;
     color: #272727;
     opacity: 0.5;
   }
    a{
      font-size: 16px;
      margin: 15px 0 0 0;
      color: #1390E5;
    }
  }

}

@media screen and (max-width: 769px){
  .notification__saveSearch{
   width: 230px;
  }
  .search__favorite{
    right: 100px;
  }
  .results__query{
    flex-direction: column;
    align-items: flex-start;
    p{
      font-size: 12px;
    }
    span{
      font-size: 12px;
    }
  }
  .results__filter{
    align-items: stretch;
  }
}
</style>