<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style scoped>
/* 自定义颜色 */
#nprogress .bar {
  background: red !important;
}
</style>

