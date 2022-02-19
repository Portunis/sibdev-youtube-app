<template>
<div v-if="itemFavorites.userId === userId" class="favorite__item">
  <h3 >{{itemFavorites.name}}</h3>
  <div class="favorite__item-btn">
    <p @click="runItem">Выполнить</p>
    <p @click="editItem">Изменить</p>
  </div>


</div>
</template>

<script>
import { mapState} from "vuex";

export default {
  name: "favoriteItem",
  data(){
    return{

    }
  },
  props:{
    itemFavorites: [Object]
  },
  computed:{
    ...mapState({
      userId: state => state.userId
    })
  },
  methods:{
    runItem(){
      this.$emit('run', this.itemFavorites)
    },
    editItem(){
      this.$emit('edit', this.itemFavorites)
    }
  }
}
</script>

<style lang="scss" scoped>
.favorite__item{
  width: 100%;
  border-bottom: 1px solid #F1F1F1;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-btn{
    display: flex;
    align-items: center;
    justify-content: space-between;
    p{
      font-family: Roboto, sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      margin: 0 10px;
      color: #000000;

      cursor: pointer;
    }
  }

  h3{

    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;

    color: #000000;
  }
}
@media screen and (max-width: 320px){
  .favorite__item{
    h3{
      width: 120px;
      overflow: hidden;
    }
  }
  .favorite__item-btn{
    flex-direction: column;
    align-items: flex-end;
    p{
      margin: 5px 0;
    }
  }



}

</style>