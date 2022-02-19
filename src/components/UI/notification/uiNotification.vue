<template>
<div class="notification">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: "uiNotification"
}
</script>

<style lang="scss" scoped>

.notification{
  position: relative;
  width: 220px;
  height: 120px;
  background: #FFFFFF;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 10px;

  p{
    font-family: PT Sans, sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 24px;
  }
  a{
    font-family: PT Sans, sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 24px;

  }
}

</style>