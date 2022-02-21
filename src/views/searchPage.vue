<template>
  <div>

    <div class="container">
      <SearchVideo  />

    </div>
  </div>
</template>

<script>

import SearchVideo from "@/components/searchVideo/searchVideo";
import ResultSearch from "@/components/searchVideo/resultSearch";
import {mapActions} from "vuex";
export default {
  name: "searchPage",
  components: {ResultSearch, SearchVideo},
  created() {
    this.loadFavorites();
  },
  methods: {
    ...mapActions({
      loadFavorites: 'updateStateCart'
    })
  }



}
</script>

<style scoped>

</style>