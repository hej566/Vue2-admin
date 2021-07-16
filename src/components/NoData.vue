<template>
  <div class="no-data-wrap">
    <img :src="require('@/assets/img/noData.png')" class="no-data-icon" />
    <div class="no-data-text">
      暂无相关数据
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.no-data-wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  .no-data-icon {
    width: 136px;
    margin: 120px 0 20px 0;
  }
  .no-data-text {
    font-size: 20px;
    line-height: 18px;
    color: #999ea8;
  }
}
</style>
