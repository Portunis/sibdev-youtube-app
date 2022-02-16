<template>
<div class="favorite">
  <h2>Избранное</h2>
  <div class="favorite__items">
    <FavoriteItem v-for="itemFavorites in GET_SAVE_VIDEOS" :itemFavorites="itemFavorites"/>
  </div>
</div>
</template>

<script>
import FavoriteItem from "@/components/favorite/favoriteItem";
import {mapGetters} from "vuex";
export default {
  name: "favorites",
  components: {FavoriteItem},
  computed: {
    ...mapGetters(['GET_SAVE_VIDEOS'])
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