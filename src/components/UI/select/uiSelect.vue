<template>
  <select class="select" v-model="modelValue" @change="changeOption">
    <option disabled value="">Без сортировки</option>
    <option
        value="car"
    >Машины
    </option>
    <option
        value="eat"
    >Еда
    </option>
    <option
        value="action"
    >Приключения
    </option>
  </select>
</template>

<script>
export default {
  name: "uiSelect",
  props: {
    modelValue: [String]
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  },


}
</script>

<style lang="scss" scoped>
.select {
  width: 334px;
  border: 1px solid rgba(23, 23, 25, 0.2);
  box-sizing: border-box;
  border-radius: 10px;
  margin: 0 auto;

  position: relative;
}

select {
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #272727;
  padding: 12px 15px 12px 15px;


}


</style>