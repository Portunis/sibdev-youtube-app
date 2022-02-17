<template>
<div class="favorite">
  <h2>Избранное</h2>
  <div class="favorite__items">
    <FavoriteItem v-for="itemFavorites in GET_SAVE_VIDEOS" :itemFavorites="itemFavorites" @edit="showDialog" @run="runItem"/>
  </div>
  <Modal v-model:show="dialogVisible" >
    <EditSearchRequest :editItem="editItem" @edit="updateRequestQuery" />
  </Modal>
</div>
</template>

<script>
import FavoriteItem from "@/components/favorite/favoriteItem";
import {mapActions, mapGetters, mapState} from "vuex";
import EditSearchRequest from "@/components/modalCustom/editSearchRequest";
import Modal from "@/components/UI/modal/modal";
export default {
  name: "favorites",
  components: {Modal, EditSearchRequest, FavoriteItem},
  data(){
    return{
      dialogVisible: false,
    }
  },
  created() {
    this.loadFavorites();
  },


  computed: {
    ...mapGetters(['GET_SAVE_VIDEOS']),
    ...mapState({
      editItem: state => state.editObj
    })

  },
  methods: {

    ...mapActions({
      loadFavorites: 'updateStateCart',
      editSearchQuery: 'getUpdateSearchQuery',
      updateSearch: 'updateSearchQuery',
      runSearchFavorite: 'getSearchFavorite'
    }),
    runItem(payload){
      this.runSearchFavorite(payload)
      console.log('runItem', payload)
    },
    updateRequestQuery(payload){
      this.updateSearch(payload)
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