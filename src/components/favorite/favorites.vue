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
    <UiNotification v-if="notification" class="notification__updateSave">
      <p>Данные успешно обновлены</p>

    </UiNotification>
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
  components: {UiNotification, Modal, EditSearchRequest, FavoriteItem},
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
      editItem: state => state.editObj
    }),
    reversedItems() {
      return this.GET_SAVE_VIDEOS.slice().reverse();
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
.notification{

  &__updateSave{
    position: absolute;
    top: 100px;
    right: 50px;

    width: auto;
    height: 72px;
    padding: 28px 30px;


  }

}
</style>