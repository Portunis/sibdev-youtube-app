<template>
<Auth />
  <transition name="notification">
  <UiNotification v-if="isErrorFetch" >Введен неверный логин или пароль</UiNotification>
  </transition>
</template>

<script>
import Auth from "@/components/auth/auth";
import {mapState} from "vuex";
import UiNotification from "@/components/UI/notification/uiNotification";

export default {
  name: "index",
  components: {UiNotification, Auth},
  computed:{
    ...mapState({
      isErrorFetch: state => state.isErrorFetch
    })
  }
}
</script>

<style scoped>

</style>