<template>
  <div class="auth">
    <div class="auth__logo">
      <UiLogo/>
    </div>
    <div class="auth__inputGroup">
    <h2>Вход</h2>
     <form class="form">
       <div class="form__login">
         <label class="form__inputLabel">Логин</label>
        <ui-input  type="text" name="login" v-model="auth.login"/>
       </div>
       <div class="form__password">
         <label class="form__inputLabel ">Пароль</label>
         <ui-input  :type="passwordType" v-model="auth.password" name="password" autocomplete="on"/>
         <a @click="switchPasswordType"  class="form__passwordVisible">
           <password-eye   :visible="passwordType" />
         </a>
       </div>
       <ui-button @click.prevent="loggedUser">Войти</ui-button>
     </form>
    </div>

  </div>
</template>

<script>
import PasswordEye from "@/components/UI/input/passwordEye";
import UiButton from "@/components/UI/button/uiButton";
import UiInput from "@/components/UI/input/uiInput";
import UiLogo from "@/components/UI/logo/uiLogo";
import {mapActions} from "vuex";
export default {
  name: "auth",
  components: {UiLogo, UiInput, UiButton, PasswordEye},
  data(){
    return{
      passwordType: 'password',
      activeFocus: false,
      auth: {
        login: '',
        password: '',
      }
    }
  },

  methods:{
    ...mapActions({
      logged: 'loggedUser'
    }),
    loggedUser(){
      this.logged(this.auth)
    },
    switchPasswordType(){
      this.passwordType = this.passwordType === 'password'  ? 'text' : 'password';
      console.log(this.passwordType)
    }
  }
}
</script>

<style lang="scss" scoped>

.auth {
  position: absolute;
  width: 510px;
  height: auto;
  background: #FAFAFA;
  left: calc(50% - 510px/2);
  top: calc(50% - 520px/2);
  border: 1px solid rgba(39, 39, 39, 0.1);
  box-sizing: border-box;
  border-radius: 10px;
  &__logo{
    width: 88px;
    height: 88px;
    margin: 40px auto 32px;
  }
  &__inputGroup{
   text-align: center;
    h2{
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 28px;
      color: #000000;
    }
  }
}
.form{
  &__password{
    position: relative;
    input{
      padding: 12px 15px 12px 15px;

    }
  }

  &__inputLabel{
    display: inline-block;
    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 22px;
    text-align: left;
    width: 334px;
    margin: 20px auto 0;
    color: rgba(23, 23, 25, 0.3);
  }
  &__passwordVisible{
    position: absolute;
    bottom: 9px;
    right: 103px;
  }
}

@media screen and (max-width: 320px){
 .auth{
   width: 304px;
   height: 520px;
   left: calc(50% - 304px/2);
   top: calc(50% - 520px/2);
 }
  .form{
    input{
      width: 284px;
    }
  }

  .form__passwordVisible{
    right: 20px;
  }
  .form__inputLabel{
    width: 284px;
  }
}
</style>