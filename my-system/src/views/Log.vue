<template>
  <div class="indexContainer">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbList="breadcrumbList"></Breadcrumb>
    <el-card class="margin-top-20">
      <el-button
        type="primary"
        class="margin-left-10"
        v-if="permissionID"
        @click="addLogForm = true"
        >创建系统日志</el-button
      >
      <el-table
        :data="logList"
        stripe
        border
        style="width: 100%; margin-top: 40px"
      >
        <el-table-column label="ID" type="index"></el-table-column>
        <el-table-column prop="info" label="系统更新优化信息"></el-table-column>
        <el-table-column
          width="200px"
          prop="createTime"
          label="创建时间"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column
          width="200px"
          prop="updateTime"
          label="更新时间"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column width="200" label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit(scope.row)"
              v-if="permissionID"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页栏 -->
      <el-pagination
        style="margin-top: 20px; text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[6, 8, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="logList.length"
      >
      </el-pagination>
    </el-card>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑系统消息" :visible.sync="editLogForm">
      <el-form :model="editFormList">
        <el-form-item label="系统优化消息" label-width="100px">
          <el-input
            v-model="editFormList.info"
            placeholder="请输入优化消息"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="editLogForm = false">取 消</el-button>
        <el-button type="primary" @click="handelSubmitEditLog(editFormList)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 新增弹出框 -->
    <el-dialog title="新增系统消息" :visible.sync="addLogForm">
      <el-form :model="addFormList">
        <el-form-item label="系统优化消息" label-width="100px">
          <el-input
            v-model="addFormList.info"
            placeholder="请输入优化消息"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="addLogForm = false">取 消</el-button>
        <el-button type="primary" @click="handelSubmitaddLog(addFormList)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb";
import { getLogList, editLog, addLog } from "../utils/request";
import dayjs from "dayjs";
export default {
  name: "Log",
  components: { Breadcrumb },
  data() {
    return {
      breadcrumbList: ["您的位置", "日志管理"],
      logList: [], //系统日志列表
      editFormList: {}, //编辑表单对象
      addFormList: {}, //新增表单对象
      editLogForm: false, //编辑表单展示
      addLogForm: false, //新增表单展示
      currentPage: 1,
      pageSize: 8,
      currentPage4: 1,
    };
  },
  mounted() {
    this.getLogList();
  },
  methods: {
    formatter(row, columns, value) {
      return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    },

    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 获取日志列表
    async getLogList() {
      const res = await getLogList();
      if (res.code !== 0) {
        return this.$message.error("获取系统日志列表失败");
      }
      this.logList = res.data;
    },
    // 编辑系统日志列表
    async handleEdit(row) {
      this.editLogForm = true;
      let logObj = { ...row };
      this.editFormList = logObj;
      console.log(this.editFormList);
    },
    // 提交编辑消息
    async handelSubmitEditLog(value) {
      const { id, info } = value;
      const res = await editLog({ id, info });
      if (res.code !== 0) {
        return this.$message.error("提交数据失败");
      }
      this.$message.success("提交数据成功");
      this.editLogForm = false;
      this.getLogList();
    },
    // 提交新增消息
    async handelSubmitaddLog(addLogForm) {
      const { info } = addLogForm;
      const res = await addLog({ info });
      if (res.code !== 0) {
        return this.$message.error("创建系统日志失败");
      }
      this.$message.success("创建系统日志成功");
      this.addLogForm = false;
      this.getLogList();
    },
  },
  computed: {
    permissionID() {
      return this.$store.state.loginId == 0 ? true : false;
    },
  },
};
</script>

<style lang="less" scoped>
.indexContainer {
  margin-bottom: 60px;
}
.margin-top-20 {
  margin-top: 20px;
}
.margin-left-10 {
  margin-left: 10px;
}
.searchAndAdd .el-input {
  width: 200px;
}
</style>