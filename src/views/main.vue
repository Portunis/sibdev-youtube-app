<template>
  <div>
    <UiNavBar/>
    <div class="container">
      <SearchVideo  />

    </div>
  </div>
</template>

<script>
import UiNavBar from "@/components/UI/navbar/uiNavBar";
import SearchVideo from "@/components/searchVideo/searchVideo";
import ResultSearch from "@/components/searchVideo/resultSearch";
export default {
  name: "main",
  components: {ResultSearch, SearchVideo, UiNavBar}
}
</script>

<style scoped>

</style>