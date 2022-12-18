<template>
  <div class="indexContainer">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbList="breadcrumbList"></Breadcrumb>
    <div class="main">
      <div class="box1">
        <div class="subbox1">
          <img src="../assets/imgs/avatar.jpeg" alt="" />
        </div>
        <div class="subbox2">
          <div>账号：{{ loginInfo.account }}</div>
          <div>用户名：{{ loginInfo.userName }}</div>
          <div>电子邮箱：{{ loginInfo.email }}</div>
          <div>入职时间：{{ loginInfo.createTime }}</div>
        </div>
        <div class="subbox3">
          <el-button type="primary" @click="personalModel = true"
            >更改个人信息</el-button
          >
          <el-button type="success" @click="isAddBorrowDialog = true"
            >申请租借资产</el-button
          >
        </div>
      </div>
      <div class="box2">
        <div class="div1" id="classifyBox">1</div>
        <div class="div2">
          <!-- 表格数据 -->
          <el-table
            :data="classifyDate"
            height="300"
            border
            style="width: 100%"
            stripe
          >
            <el-table-column type="index" label="ID"> </el-table-column>
            <el-table-column prop="assectName" label="租借资产">
            </el-table-column>
            <el-table-column prop="borrowTime" label="租借时间">
            </el-table-column>
            <el-table-column prop="returnTime" label="归还时间">
            </el-table-column>
            <el-table-column label="租借状态" align="center">
              <template slot-scope="scope">
                <div slot="reference">
                  <el-tag
                    size="medium"
                    type="success"
                    v-if="scope.row.borrowStatus == 0"
                    >已归还</el-tag
                  >
                  <el-tag size="medium" type="danger" v-else>未归还</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.borrowStatus != 0"
                  size="mini"
                  type="primary"
                  @click="handleSubmit(scope.$index, scope.row)"
                  >归还资产</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 修改用户信息弹出框 -->
    <el-dialog title="更改个人信息" :visible.sync="personalModel" width="40%">
      <el-form label-width="80px" :model="personalForm">
        <el-form-item label="账号">
          <el-input v-model="personalForm.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="personalForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="personalForm.password"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="personalForm.sex" label="男">男</el-radio>
          <el-radio v-model="personalForm.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="personalForm.role" disabled></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="personalForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="personalForm.email"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="personalForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="personalModel = false">取 消</el-button>
        <el-button type="primary" @click="updateUserInfo(personalForm)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 申请租借弹出框 -->
    <el-dialog title="租借资产" :visible.sync="isAddBorrowDialog" width="40%">
      <el-form
        :model="addBorrowObj"
        label-width="120px"
        ref="borrowRef"
        :rules="borrowRules"
      >
        <el-form-item label="租借人" prop="account">
          <el-input v-model="addBorrowObj.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="资产名称" prop="assectName">
          <el-cascader
            v-model="addBorrowObj.assectName"
            :options="assectsOptions"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="租借时间" prop="borrowTime">
          <el-date-picker
            v-model="addBorrowObj.borrowTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="借阅日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="计划归还时间" prop="planReturnTime">
          <el-date-picker
            v-model="addBorrowObj.planReturnTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="计划归还日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isAddBorrowDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitBorrow('borrowRef')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb";
import * as echarts from "echarts";
import {
  getBorrowList,
  returnBorrow,
  editUser,
  getAssectsClassify,
  getAssectsList,
  applyBorrow,
} from "../utils/request";
import dayjs from "dayjs";
export default {
  name: "",
  components: {
    Breadcrumb,
  },
  data() {
    return {
      breadcrumbList: ["您的位置", "个人中心"],
      loginInfo: this.$store.state.loginInfo,
      account: this.$store.state.loginInfo.account,
      personalModel: false,
      personalForm: {},
      classifyDate: [],
      userId: this.$store.state.loginInfo.userId,
      addBorrowObj: {
        account: this.$store.state.loginInfo.account,
      }, //租借资产
      isAddBorrowDialog: false, //控制弹出框
      assectsOptions: [], //资产详情
      // 校验规则
      borrowRules: {
        account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        borrowTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        planReturnTime: [
          { required: true, message: "请选择日期", trigger: "change" },
        ],
        assectName: [
          { required: true, message: "请输入租借资产名称", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    this.getUserInfo();
    this.getAllAssects();
  },
  methods: {
    // 获取用户信息
    async getUserInfo() {
      const res = await getBorrowList();
      const arr = res.data;
      let classifyArr = [];
      arr.forEach((item) => {
        if (this.account == item.account) {
          classifyArr.push(item);
        }
      });
      this.classifyDate = classifyArr;
      let classifyBox = echarts.init(document.getElementById("classifyBox"));
      classifyBox.setOption({
        title: [
          {
            text: "租借资产总数",
            x: "center",
            top: "55%",
            textStyle: {
              color: "#FFFFFF",
              fontSize: 16,
              fontWeight: "100",
            },
          },
          {
            text: classifyArr.length,
            x: "center",
            y: "center",
            textStyle: {
              fontSize: "60",
              color: "#FFFFFF",
              fontFamily: "DINAlternate-Bold, DINAlternate",
              foontWeight: "600",
            },
          },
        ],
        backgroundColor: "#001529",
        polar: {
          radius: ["42%", "52%"],
          center: ["50%", "50%"],
        },
        angleAxis: {
          max: 100,
          show: false,
        },
        radiusAxis: {
          type: "category",
          show: true,
          axisLabel: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            name: "",
            type: "bar",
            roundCap: true,
            barWidth: 30,
            showBackground: true,
            backgroundStyle: {
              color: "rgba(66, 66, 66, .3)",
            },
            data: [60],
            coordinateSystem: "polar",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  {
                    offset: 0,
                    color: "#16CEB9",
                  },
                  {
                    offset: 1,
                    color: "#6648FF",
                  },
                ]),
              },
            },
          },
          {
            name: "",
            type: "pie",
            startAngle: 80,
            radius: ["56%"],
            hoverAnimation: false,
            center: ["50%", "50%"],
            itemStyle: {
              color: "rgba(66, 66, 66, .1)",
              borderWidth: 1,
              borderColor: "#5269EE",
            },
            data: [100],
          },
          {
            name: "",
            type: "pie",
            startAngle: 80,
            radius: ["38%"],
            hoverAnimation: false,
            center: ["50%", "50%"],
            itemStyle: {
              color: "rgba(66, 66, 66, .1)",
              borderWidth: 1,
              borderColor: "#5269EE",
            },
            data: [100],
          },
        ],
      });
    },
    // 归还资产
    handleSubmit(index, row) {
      this.$confirm("确认是否归还此资产?", "资产规划", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          this.$message({
            type: "success",
            message: "归还成功!",
          });
          row.returnTime = dayjs().format("YYYY-MM-DD");
          console.log(row);
          const res = await returnBorrow(row);
          if (res.code) {
            return this.$message.err(res.msg);
          }
          this.getUserInfo();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "归还失败",
          });
        });
    },
    // 更新用户信息
    async updateUserInfo(personalForm) {
      personalForm.userId = this.userId;
      console.log(personalForm);
      const res = await editUser(personalForm);
      if (res.code) {
        return this.$message.error(res.msg);
      }
      this.$message.success("更新信息成功，即将跳转回登录页~");
      this.personalModel = false;
      sessionStorage.removeItem("token");
      this.$store.commit("setTokenInfo", null);
      setTimeout(() => {
        this.$router.replace({ path: "/login" });
      }, 2000);
    },
    // 获取所有资产列表
    async getAllAssects() {
      const res1 = await getAssectsClassify();
      const res2 = await getAssectsList();
      res1.data.filter((item1) => {
        // 声明对象，将第一层遍历的分类放入对象中
        let assects = {
          value: item1.className,
          label: item1.className,
          children: [],
        };
        res2.data.filter((item2) => {
          // 判断所属分类是否相同，一致将资产名字放入数组中
          if (item1.className == item2.classify) {
            assects.children.push({
              value: item2.assectName,
              label: item2.assectName,
            });
          }
        });
        // 传入数组
        this.assectsOptions.push(assects);
      });
    },
    // 提交租借
    submitBorrow() {
      this.$refs.borrowRef.validate(async (value) => {
        if (value) {
          console.log(this.addBorrowObj);
          const res = await applyBorrow({ ...this.addBorrowObj });
          if (res.code !== 0) {
            return this.$message.error(res.msg);
          }
          this.$message.success(res.msg);
        } else {
          return this.$message.error("租借失败");
        }
        this.isAddBorrowDialog = false;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.indexContainer {
  margin-bottom: 60px;
}

.main {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  .box1 {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    margin: 0 20px;
    height: 650px;
    border-radius: 20px;
    .subbox1 {
      flex: 1;
      width: 200px;
      height: 200px;
      margin-top: 20px;
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }
    }
    .subbox2 {
      margin-top: 40px;
      width: 400px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-items: center;
      flex: 2;
      border: 5px solid #5470c6;
      border-radius: 10px;
      div {
        flex: 1;
        width: 300px;
        border-bottom: 1px solid #ccc;
        text-align: center;
        line-height: 60px;
      }
    }
    .subbox3 {
      flex: 1;
      margin-top: 40px;
    }
  }
  .box2 {
    flex: 2;
    display: flex;
    flex-direction: column;
    margin: 0 20px;
    height: 650px;
    .div1 {
      flex: 1;
      border-radius: 20px;
      height: 100px;
    }
    .div2 {
      flex: 1;
      margin-top: 40px;
      border-radius: 20px;
    }
  }
}
.margin-left-10 {
  margin-left: 10px;
}
.searchAndAdd .el-input {
  width: 200px;
}
</style>