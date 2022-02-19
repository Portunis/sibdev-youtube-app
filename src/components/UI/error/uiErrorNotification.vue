<template>
  <div class="notification">
    <p> <slot></slot></p>

  </div>
</template>

<script>
export default {
  name: "uiErrorNotification"
}
</script>

<style lang="scss" scoped>

.notification{
  position: absolute;
  top: 100px;
  right: 30px;
  max-width: 400px;
  width: auto;
  height: auto;
  padding: 20px 10px;
  background: #FFFFFF;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 10px;


  p{
    font-family: PT Sans, sans-serif;
    font-style: normal;
    font-weight: normal;
    line-height: 24px;
    text-align: center;
  }

}

</style>