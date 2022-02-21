<template>
  <UiNavBar  v-if="LOGGED_IN"/>
  <router-view/>
</template>

<script>
import UiNavBar from "@/components/UI/navbar/uiNavBar";
import {mapGetters} from "vuex";
export default {
  components: {UiNavBar},
  computed: {
    ...mapGetters([
        'LOGGED_IN'
    ])
  }
}
</script>
<style lang="scss">

</style>
