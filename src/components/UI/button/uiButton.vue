<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "uiButton"
}
</script>

<style lang="scss" scoped>
.button{
  background: #1390E5;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;

  color: #FFFFFF;

  padding: 15px 60px;
  margin: 40px 0;
}
</style>