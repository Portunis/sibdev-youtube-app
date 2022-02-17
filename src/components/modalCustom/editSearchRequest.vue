<template>
  <div class="modal">
    <h2>Изменить запрос</h2>
    <form>
      <div>
        <label>Запрос</label>
        <UiInput class="modalInput"  type="text" placeholder="Запрос" v-model="editItem.title" />
      </div>
      <div>
        <label>Название</label>
        <UiInput class="modalInput" type="text" placeholder="Запрос" v-model="editItem.name" />
      </div>
      <div>

        <p>Сортировать по</p>
        <UiSelect class="modalInput" v-model="editItem.sortedType"/>
      </div>
      <div>
        <label>Максимальное количество</label>
        <div class="modalInputRange">
          <UiInput class="modalInputRange__slider" type="range" min="0" max="50" step="1" v-model="editItem.maxResults"/>
          <UiInput class="modalInputRange__number" type="number" disabled v-model="editItem.maxResults"/>
        </div>
      </div>
      <div>

        <UiButton class="modalInput__noSave" @click.prevent>Не изменять</UiButton>
        <UiButton class="modalInput__save" @click.prevent="updateSearchQuery">Изменить</UiButton>
      </div>
    </form>
  </div>
</template>

<script>
import UiInput from "@/components/UI/input/uiInput";
import UiButton from "@/components/UI/button/uiButton";
import UiSelect from "@/components/UI/select/uiSelect";
import {mapActions} from "vuex";

export default {
  name: "editSearchRequest",
  components: {UiSelect, UiButton, UiInput},
  data() {
    return {

    }
  },
  props:{
    editItem: [Object]
  },

  methods: {

    updateSearchQuery(){
      this.$emit('edit', this.editItem)
    }
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
</style>