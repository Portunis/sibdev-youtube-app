<template>
<div class="favorite">
  <h2>Избранное</h2>
  <div class="favorite__items">
    <FavoriteItem v-for="itemFavorites in reversedItems" :itemFavorites="itemFavorites" @edit="showDialog" @run="runItem"/>
  </div>
  <transition name="notification">
  <Modal v-model:show="dialogVisible" >
    <EditSearchRequest :editItem="editItem" @edit="updateRequestQuery" @closeModal="closeDialog"/>
  </Modal>

  </transition>
  <transition name="notification">
    <UiNotification v-if="notification">
      Данные успешно обновлены
    </UiNotification>
  </transition>
  <transition name="notification">
    <UiNotification v-if="isErrorFetch">Произошла ошибка запроса, попробуйте позже</UiNotification>
  </transition>

</div>
</template>

<script>
import FavoriteItem from "@/components/favorite/favoriteItem";
import {mapActions, mapGetters, mapState} from "vuex";
import EditSearchRequest from "@/components/modalCustom/editSearchRequest";
import Modal from "@/components/UI/modal/modal";
import UiNotification from "@/components/UI/notification/uiNotification";
export default {
  name: "favorites",
  components: { UiNotification, Modal, EditSearchRequest, FavoriteItem},
  data(){
    return{
      dialogVisible: false,
      notification: false,
    }
  },
  created() {
    this.loadFavorites();
  },


  computed: {
    ...mapGetters(['GET_SAVE_VIDEOS']),
    ...mapState({
      editItem: state => state.editObj,
      isErrorFetch: state => state.isErrorFetch
    }),
    reversedItems() {
      return this.GET_SAVE_VIDEOS ? this.GET_SAVE_VIDEOS.slice().reverse() : this.GET_SAVE_VIDEOS ;
    },

  },
  methods: {

    ...mapActions({
      loadFavorites: 'updateStateCart',
      editSearchQuery: 'getUpdateSearchQuery',
      updateSearch: 'updateSearchQuery',
      fetchAPI: 'fetchAPI',
    }),
    runItem(payload){
      this.fetchAPI(payload)
      console.log('runItem', payload)
    },
    updateRequestQuery(payload){
      this.updateSearch(payload)
      this.dialogVisible = false;
      this.notification = true;
      setTimeout(()=>{
        this.notification = false
      },5000)
    },
    closeDialog(){
      this.dialogVisible = false;
    },
    showDialog(payload) {
      this.dialogVisible = true;
      this.editSearchQuery(payload)
      console.log('id  edit modal', payload)
      console.log('модал')
    },
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

</style>