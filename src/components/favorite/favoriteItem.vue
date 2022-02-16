<template>
<div class="favorite__item">
  <h3>{{itemFavorites.name}}</h3>
</div>
</template>

<script>
export default {
  name: "favoriteItem",
  props:{
    itemFavorites: [String, Number]
  }
}
</script>

<style lang="scss" scoped>
.favorite__item{
  width: 100%;
  border-bottom: 1px solid #F1F1F1;
  padding: 14px 20px;
  h3{

    font-family: Roboto, sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;

    color: #000000;
  }
}
</style>