<template>
  <div>
    <UiNavBar/>
    <div class="container">
      <Favorites/>

    </div>
  </div>
</template>

<script>
import UiNavBar from "@/components/UI/navbar/uiNavBar";
import Favorites from "@/components/favorite/favorites";
export default {
  name: "favorite",
  components: {Favorites, UiNavBar}
}
</script>

<style scoped>

</style>