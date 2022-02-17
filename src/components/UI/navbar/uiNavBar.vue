<template>
<div class="navbar">
  <div class="container">
    <div class="navbar__element">
      <div class="navbar__element-left">
        <UiLogo class="navbar__logo"/>
        <router-link to="/search">Поиск</router-link>
        <router-link to="/favorite">Избранное</router-link>
      </div>
      <div class="navbar__element-right">
        <a @click="unLoggedUser">Выйти</a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import UiLogo from "@/components/UI/logo/uiLogo";
import {mapActions} from "vuex";
export default {
  name: "uiNavBar",
  components: {UiLogo},
  methods:{
    ...mapActions({
      unLoggedUser: 'unLoggedUser'
    })
  }

}
</script>

<style lang="scss" scoped>
.navbar{
  height: 80px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  &__element{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__element-left{
    display: flex;
    justify-content: space-between;
    align-items: center;
    a{


      color: rgba(39, 39, 39, 0.3);
      font-size: 18px;
      line-height: 28px;
      margin: 0 20px;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      &:hover{
        padding: 25px 0;
        color: #1390E5;
        border-bottom: 2px solid #1390E5;
      }
    }
    a.router-link-active{
      color: #1390E5;
      padding: 25px 0;
      border-bottom: 2px solid #1390E5;
    }

  }
  &__element-right{
    margin: 26px 20px;
    a{
      cursor: pointer;
      color:#1390E5;
      font-size: 18px;
      line-height: 28px;
    }
  }
  &__logo{
    width: 48px;
    height: 48px;
    margin: 16px 20px 16px 0;
  }
}
</style>