<template>
  <input
      class="input"
      @input="updateInput"
      :value="modelValue"
      />
</template>

<script>
export default {
  name: "uiInput",
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event){
      this.$emit("update:modelValue", event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input{
  width: 334px;
  border: 1px solid rgba(23, 23, 25, 0.2);
  box-sizing: border-box;
  border-radius: 10px;
  margin: 0 auto;
  padding: 12px 15px 12px 15px;
  position: relative;
}
.input[type=text]:focus {
  background: rgba(197, 228, 249, 0.3);
  border: 1px solid #1390E5;
}
.input[type=password]:focus {
  background: rgba(197, 228, 249, 0.3);
  border: 1px solid #1390E5;
}
.input.active{
  background: rgba(197, 228, 249, 0.3);
  border: 1px solid #1390E5;
}
</style>