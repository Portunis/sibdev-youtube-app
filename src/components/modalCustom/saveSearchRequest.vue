<template>
  <div class="modal">
    <h2>Сохранить запрос</h2>
    <form>
      <div>
        <label>Запрос</label>
        <UiInput class="modalInput" disabled type="text" placeholder="Запрос" :model-value="searchRequest"/>
      </div>
      <div>

        <label><span>*</span>Название</label>
        <UiInput class="modalInput" type="text" placeholder="Запрос" v-model="savePost.name"/>
      </div>
      <div>

        <p>Сортировать по</p>
        <UiSelect class="modalInput" v-model="savePost.sortedType"/>
      </div>
      <div>
        <label>Максимальное количество</label>
        <div class="modalInputRange">
          <UiInput class="modalInputRange__slider" type="range" min="1" max="50" step="1" v-model="savePost.maxResults" :value="savePost.maxResults"/>
          <UiInput class="modalInputRange__number" type="number" disabled v-model="savePost.maxResults" :value="savePost.maxResults"/>
        </div>
      </div>
      <div>

        <UiButton class="modalInput__noSave" @click.prevent="closeModal">Не сохранять</UiButton>
        <UiButton class="modalInput__save" :disabled="!savePost.name.length" @click.prevent="createFavoritesQuery">Сохранить</UiButton>
      </div>
    </form>
  </div>
</template>

<script>
import UiInput from "@/components/UI/input/uiInput";
import UiButton from "@/components/UI/button/uiButton";
import UiSelect from "@/components/UI/select/uiSelect";


export default {
  name: "saveSearchRequest",
  components: {UiSelect, UiButton, UiInput},
  data() {
    return {
      savePost: {
        title: this.searchRequest,
        name: '',
        sortedType: '',
        maxResults: 12,

      }
    }
  },
  props: {
    searchRequest: [String]
  },

  methods: {
    createFavoritesQuery(){
      this.savePost.userId = this.$store.state.userId
      this.savePost.id = Date.now()
      this.$emit('create', this.savePost)
      console.log('savepost', this.savePost)
      this.savePost = {
        title: '',
        name: '',
        sortedType: '',
        maxResults: '',
      }
    },
    closeModal(){
      this.$emit('closeModal')
      this.savePost = {
        title: this.searchRequest,
        name: '',
        sortedType: '',
        maxResults: 12,

      }
    },
  }
}
</script>

<style lang="scss" scoped>
h2 {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 28px;

  color: #000000;
  text-align: center;
  margin-bottom: 36px;
}

label {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #272727;
  text-align: left;
  margin-left: 20px;
  span{
    color: #FF0000;
    padding: 0 1px;
  }
}
p{
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  color: #272727;
  text-align: left;
  margin: 0 20px;
}
.modal {
  width: 100%;
  margin: 0 auto;
}

.modalInput {
  width: 430px;
  margin: 0 20px 24px;

  &__save{
    width: 210px;
    padding: 14px 20px;
    &:disabled{
      background: rgba(74, 74, 74, 0.42);
    }
  }
 &__noSave{
   width: 210px;
   border: 1px solid #1390E5;
   background: none;
   padding: 14px 20px;

   margin: 20px ;
   color: #1390E5;
 }
}

.modalInputRange {
  display: flex;
  align-items: center;







  &__number {
    padding: 14px 37px;
    text-align: center;
    width: 100px;
    border: 1px solid rgba(23, 23, 25, 0.2);
    box-sizing: border-box;
    border-radius: 10px;
  }
}
@media screen and (max-width: 320px){
  form{
    label{
      margin: 0;
    }
    p{
      margin: 0;
    }
  }
  .modalInput__noSave{
    font-size: 16px;
    padding: 13px 14px;
    margin: 0;
    width: 139px;
  }
  .modalInput__save{
    font-size: 18px;
    padding: 13px 14px;
    width: 139px;
  }

  .modalInputRange{
    width: 135px;
    margin: 5px 0 0 0 ;
  }
  .modalInputRange__number{
    font-size: 20px;
  }
  .modalInputRange__slider{
    margin: 0 13px;
  }
  .modalInput{
    width: 284px;
    margin: 0 0 24px
  }


}
</style>