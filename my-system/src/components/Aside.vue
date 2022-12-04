<template>
  <el-menu
    :default-active="this.$route.path" 
    text-color="#bba491"
    active-text-color="#0a60bd"
    unique-opened
    router
    :collapse="isCollapse"
    :collapse-transition="false"
    @select="handleSelect"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item
      v-for="item in menuList"
      :key="item.id"
      :index="'/' + item.path"
    >
      <i :class="`iconfont icon-${item.iconPath}`"></i>
      <span slot="title">{{ item.authName }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: ["isCollapse"],
  data() {
    return {
      index: "1",
      menuList: [
        {
          id: 1,
          authName: "系统首页",
          iconPath: "wendangguanlixitong-shouyetubiao",
          path: "home/index",
        },
        {
          id: 2,
          authName: "资产管理",
          iconPath: "zichanguanli",
          path: "home/library",
        },
        {
          id: 3,
          authName: "分类管理",
          iconPath: "fenlei2",
          path: "home/classification",
        },
        {
          id: 4,
          authName: "用户管理",
          iconPath: "yonghuguanli",
          path: "home/borrowing",
        },
        {
          id: 5,
          authName: "角色管理",
          iconPath: "jiaoseguanli",
          path: "home/users",
        },
        {
          id: 6,
          authName: "系统日志",
          iconPath: "xitongrizhi",
          path: "home/role",
        },
        {
          id: 7,
          authName: "留言建议",
          iconPath: "liuyanjianyi",
          path: "home/log",
        },
        {
          id: 8,
          authName: "个人中心",
          iconPath: "xwtubiaoku-20",
          path: "home/log",
        },
        {
          id: 9,
          authName: "审批管理",
          iconPath: "shenpi",
          path: "home/log",
        },
      ],
    };
  },
  methods: {
    handleSelect(index) {
      this.index = index;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  text-align: left;
  background-color: transparent !important;
}
.iconfont {
  margin-right: 10px;
  font-size: 26px;
  font-weight: 500;
}
</style>