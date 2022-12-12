<template>
  <div class="loginContainer">
    <div class="loginBox">
      <div class="loginMain">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          label-width="80px"
        >
          <el-form-item label="用户名：" prop="name">
            <el-input type="text" v-model="loginForm.name" v-popover:popover />
          </el-form-item>
          <el-form-item label="密 码：" prop="password">
            <el-input type="password" v-model="loginForm.password" />
          </el-form-item>
          <el-form-item label="验证码：" class="verificationCode" prop="code">
            <el-row>
              <el-col :span="12">
                <el-input type="text" v-model="loginForm.code" />
              </el-col>
              <el-col :span="12">
                <div v-html="captchaUrl" @click="updateCaptcha"></div>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item> </el-form-item>
          <el-form-item style="text-align: right">
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, loginSubmit } from "../utils/request";
export default {
  name: "Login",
  data() {
    return {
      captchaUrl: "/api/captcha?time=" + new Date(),
      // 登录数据
      loginForm: {
        name: "",
        password: "",
        code: "",
      },
      // 校验规则
      loginRules: {
        name: [{ required: true, message: "请输入用户名！", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码！", trigger: "blur" },
        ],
        code: [{ required: true, message: "请输入验证码！", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.updateCaptcha();
  },
  methods: {
    // 登录
    submitForm() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          const res = await loginSubmit(this.loginForm);
          if (res.code !== 0) {
            this.updateCaptcha();
            return this.$message.error(res.msg);
          }
          this.$router.replace({ path: "/home/index" });
          this.$message.success(res.msg); //消息提示
          this.$store.commit("setLoginId", res.data.role);
          this.$store.commit("setTokenInfo", res.token);
          sessionStorage.setItem("token", res.token);
        }
      });
    },
    // 重置
    resetForm() {
      this.$refs.loginForm.resetFields();
    },
    // 更新验证码
    async updateCaptcha() {
      try {
        const res = await getCode();
        this.captchaUrl = res;
      } catch (error) {
        this.$message.error(error);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.loginContainer {
  position: relative;
  width: 100%;
  height: 100%;
  // background-color: #409eff;
  background: url(../assets/imgs/background.png) no-repeat 0 0 transparent;
  background-size: 100% 100%;
}
.loginBox {
  display: flex;
  position: absolute;
  top: 50%;
  left: 80%;
  margin-left: -350px;
  margin-top: -200px;
  width: 400px;
  height: 400px;

  .loginMain {
    width: 400px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    box-sizing: border-box;
    .el-form {
      margin-top: 50px;
      .verificationCode {
        .el-input {
          width: 120px;
          margin-right: 10px;
        }
        span {
          padding: 10px 20px;
          border: 1px solid #f1f1f1;
          border-radius: 4px;
        }
      }
    }
  }
}
.loginMain /deep/.el-popper[x-placement^="bottom"] {
  width: 258px !important;
  left: 466px !important;
}
</style>