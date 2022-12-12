<template>
  <div class="homeContainer">
    <el-container>
      <!-- 顶部区域 -->
      <el-header>
        <div class="headerBox">
          <i
            :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
            @click="showAside"
          ></i>
          <h2>企业资产管理系统</h2>
        </div>
        <div class="userInfoBox">
          <img src="../assets/imgs/avatar.jpeg" alt="" srcset="" />
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ $store.state.LoginInfo }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="logOut"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <!-- 主体区域 -->
      <el-container>
        <!-- 左边-侧边栏 -->
        <el-aside :style="{ width: asideWidth }">
          <Aside :isCollapse="isCollapse"></Aside>
        </el-aside>
        <!-- 右边-主页面 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from "../components/Aside";
export default {
  name: "Home",
  components: { Aside },
  data() {
    return {
      isCollapse: true,
      asideWidth: "65px !important", //提高指定样式规则的应用优先权
    };
  },
  methods: {
    // 展开/关闭aside侧边栏
    showAside() {
      this.isCollapse = !this.isCollapse;
    },
    logOut() {
      // element组件自带的messageBox消息弹框
      this.$confirm("确认退出？")
        .then(() => {
          // 退出移除token，并跳转回登录界面
          sessionStorage.removeItem("token");
          this.$store.commit("setTokenInfo", null);
          this.$router.replace({ path: "/login" });
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
  },
  watch: {
    // 监听是否折叠，若折叠则宽度为65px；不折叠宽度为200px
    isCollapse: {
      handler(newValue) {
        if (newValue) {
          this.asideWidth = "65px";
        } else {
          this.asideWidth = "200px";
        }
      },
    },
  },
};
</script>

<style lang="less" scoped>
.homeContainer {
  width: 100%;
  height: 100%;
}
.el-header {
  height: 80px !important;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #001529;
  .headerBox {
    display: flex;
    align-items: center;
    color: #fff;
    i {
      font-size: 30px;
      margin-right: 10px;
    }
    h2 {
      color: #fff;
    }
  }
  .userInfoBox {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #fff;
    }
    .el-icon-arrow-down {
      font-size: 12px;
      color: #fff;
    }
  }
}
.el-container {
  height: 100%;
}

.el-aside {
  height: 100%;
  background-color: #001529;
  color: #333;
}

.el-main {
  height: 100%;
  // overflow-y: scroll;
  background-color: #e9eef3;
  color: #333;
  padding-bottom: 40px;
}
</style>