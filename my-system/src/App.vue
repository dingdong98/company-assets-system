<template>
  <div class="app">
    <!-- 一级路由 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  // 办法一：将vuex中的数据直接保存到浏览器缓存中（sessionStorage、localStorage、cookie）
  // 办法二：在页面刷新的时候再次请求远程数据，使之动态更新vuex数据
  // 办法三：在父页面向后台请求远程数据，并且在页面刷新前将vuex的数据先保存至sessionStorage
  // （以防请求数据量过大页面加载时拿不到返回的数据）
  created() {
    if (window.sessionStorage.getItem("loginId")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state.loginId,
          JSON.parse(window.sessionStorage.getItem("loginId"))
        )
      );
    }
    // 监听关闭窗口事件
    window.addEventListener("beforeunload", () => {
      window.sessionStorage.setItem(
        "loginId",
        JSON.stringify(this.$store.state)
      );
    });
  },
};
</script>

<style>
html,
body,
.app {
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
}
</style>
