<template>
  <div class="borrowContainer">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbList="breadcrumbList"></Breadcrumb>
    <el-tabs type="border-card" v-model="tabName" style="margin-top: 20px">
      <el-tab-pane label="租借资产信息" name="first">
        <Eltable
          :tableArr="tableArr"
          :getKeyword="getKeyword"
          :keyword="keyword"
          :tabName="tabName"
        ></Eltable>
      </el-tab-pane>
      <el-tab-pane label="待还租借" name="second">
        <Eltable
          :tableArr="toBePaid"
          :getKeyword="getKeyword"
          :keyword="keyword"
          :tabName="tabName"
          :getAddBtn="getAddBtn"
          :returnAssectById="returnAssectById"
        ></Eltable>
      </el-tab-pane>
      <el-tab-pane label="过期租借" name="third">
        <Eltable
          :tableArr="overdue"
          :getKeyword="getKeyword"
          :keyword="keyword"
          :tabName="tabName"
          :getPlanTime="getPlanTime"
        ></Eltable>
      </el-tab-pane>
      <el-tab-pane label="审批租借" name="four">
        <Eltable
          :tableArr="applyDate"
          :getKeyword="getKeyword"
          :keyword="keyword"
          :tabName="tabName"
          :agreeBorrow="agreeBorrow"
        ></Eltable>
      </el-tab-pane>
    </el-tabs>

    <!-- 弹出框 -->
    <el-dialog
      title="添加租借资产"
      :visible.sync="isAddBorrowDialog"
      width="40%"
    >
      <el-form
        :model="addBorrowObj"
        label-width="80px"
        ref="borrowRef"
        :rules="borrowRules"
      >
        <el-form-item label="租借人" prop="account">
          <el-input v-model="addBorrowObj.account"></el-input>
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
        <el-form-item label="归还时间" prop="planReturnTime">
          <el-date-picker
            v-model="addBorrowObj.planReturnTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="归还日期"
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
import {
  getBorrowList,
  createBorrow,
  searchBorrow,
  returnBorrow,
  getAssectsClassify,
  getAssectsList,
  getPlanTime,
  PostPlanStatus,
  agreeBorrow,
} from "../utils/request";
import Breadcrumb from "../components/Breadcrumb";
import Eltable from "../components/Eltable";
import dayjs from "dayjs";
export default {
  name: "Borrowing",
  components: { Breadcrumb, Eltable },
  data() {
    return {
      breadcrumbList: ["您的位置", "审批管理"],
      tabName: "first", //控制窗口序号
      tableArr: [], // 所有借阅信息
      toBePaid: [], // 待还借阅
      overdue: [], // 逾期借阅
      applyDate: [], //租借申请
      keyword: "", //搜索关键词
      isAddBorrowDialog: false, // 控制对话框显示隐藏
      addBorrowObj: {},
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
      assectsOptions: [], //级联选择器数据
    };
  },
  mounted() {
    this.getBorrowInfo();
    this.getAllAssects();
  },
  methods: {
    // 获取计划时间
    async getPlanTime() {
      // 调用接口获取待归还数据
      const res = await getPlanTime();
      console.log(1);
      // 现在时间
      let nowTime = dayjs(dayjs().format("YYYY-MM-DD HH:mm:ss"));
      let PlanArr = [];
      for (let item of res.data) {
        let planTime = dayjs(
          dayjs(item.planReturnTime).format("YYYY-MM-DD HH:mm:ss")
        );
        let diffTime = planTime.diff(nowTime, "hour");
        if (diffTime < 0) {
          PlanArr.push(item.id);
        }
      }
      // 调用接口修改状态
      await PostPlanStatus(PlanArr);
      this.$router.go(0); //刷新页面
    },
    // 获取查询账号的内容
    async getKeyword(account) {
      let status = "0"; //判断租借状态
      if (this.tabName === "second") {
        status = "1"; //第二窗口
      } else if (this.tabName === "third") {
        status = "2"; //第三窗口
      } else if (this.tabName === "first") {
        status = "0"; //第一窗口
      } else {
        status = "3"; //第四窗口
      }
      if (!account.trim()) {
        //输入空格
        this.getBorrowInfo();
      } else {
        const res = await searchBorrow({ account, status });
        if (res.code !== 0) {
          return this.$message.error(res.msg);
        }
        this.$message.success(res.msg);
        res.data.forEach((item) => {
          if (!item.returnTime) {
            item.returnTime = "~~";
          }
        });
        if (this.tabName === "first") {
          this.tableArr = res.data;
        } else if (this.tabName === "second") {
          this.toBePaid = res.data;
        } else if (this.tabName === "third") {
          this.overdue = res.data;
        } else {
          this.applyDate = res.data;
        }
      }
      this.keyword = ""; //清空搜索栏
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
    // 获取所有租借信息列表
    async getBorrowInfo() {
      const res = await getBorrowList();
      if (res.code !== 0) {
        return this.$message.error(res.msg);
      }
      res.data.forEach((item) => {
        if (!item.returnTime) {
          item.returnTime = "~~";
        }
      });
      this.tableArr = res.data; //状态为0，借阅信息
      this.toBePaid = res.data.filter((item) => item.borrowStatus === 1); //状态为1，待归还
      this.overdue = res.data.filter((item) => item.borrowStatus === 2); //状态为2，过期未还
      this.applyDate = res.data.filter((item) => item.borrowStatus === 3); //状态位3，租借申请
    },
    // 提交租借
    submitBorrow() {
      this.$refs.borrowRef.validate(async (valid) => {
        if (valid) {
          const res = await createBorrow(this.addBorrowObj);
          if (res.code !== 0) {
            return this.$message.error(res.msg);
          }
          this.$message.success(res.msg);
          this.getBorrowInfo();
          this.isAddBorrowDialog = false;
          this.$refs.borrowRef.resetFields();
        } else {
          this.$message.error("租借失败");
          return false;
        }
      });
    },
    // 获取用户是否点击了添加按钮
    getAddBtn(val) {
      this.isAddBorrowDialog = val;
    },
    // 归还资产
    async returnAssectById(id) {
      const returnTime = dayjs(new Date()).format("YYYY-MM-DD");
      const res = await returnBorrow({ id, returnTime });
      if (res.code !== 0) {
        return this.$message.error(res.msg);
      }
      this.$message.success(res.msg);
      this.getBorrowInfo();
    },
    // 同意租借
    async agreeBorrow(id) {
      console.log(id);
      const res = await agreeBorrow({ id });
      if (res.code !== 0) {
        this.$message.error(res.msg);
      }
      this.$message.success(res.msg);
      this.getBorrowInfo();
    },
  },
};
</script>

<style lang="less" scoped>
.borrowContainer {
  width: 100%;
  // height: 100%;
  margin-bottom: 60px;
  .el-card {
    width: 100%;
    margin-top: 20px;
  }
}
</style>