<template>
  <div class="indexContainer">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbList="breadcrumbList"></Breadcrumb>
    <el-card class="margin-top-20">
      <!-- 搜索框 -->
      <div class="searchAndAdd">
        <span class="margin-left-10">建议内容：</span>
        <el-input
          v-model="suggestContent"
          placeholder="请输入要查询的建议内容"
        ></el-input>
        <el-button type="primary" @click="searchSuggest" class="margin-left-10"
          >查询</el-button
        >
        <el-button type="primary" @click="showModel = true">创建</el-button>
      </div>
      <!-- 主体页面 -->
      <el-table
        :data="suggestList"
        stripe
        border
        style="width: 100%; margin-top: 40px"
      >
        <el-table-column
          prop="account"
          label="账号"
          width="120"
        ></el-table-column>
        <el-table-column prop="content" label="建议内容"></el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="200"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="200"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editSugget(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleteSuggest(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 新增界面 -->
    <el-dialog title="创建留言" :visible.sync="showModel" width="50%">
      <el-form :model="createSugget" ref="suggetFormRef" label-width="80px">
        <el-form-item label="账号"
          ><el-input placeholder="请输入账号" v-model="createSugget.account"
        /></el-form-item>
        <el-form-item label="建议内容"
          ><el-input type="textarea" v-model="createSugget.content"
        /></el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="createSugget.createTime"
        /></el-form-item>
        <el-form-item label="更新时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            v-model="createSugget.updateTime"
        /></el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="showModel = false">取消</el-button>
        <el-button @click="submitSuggest" type="primary">确认</el-button>
      </span>
    </el-dialog>
    <!-- 编辑界面 -->
    <el-dialog title="编辑留言" :visible.sync="editModel" width="50%">
      <el-form
        :model="editSuggetList"
        ref="editSuggestFormRef"
        label-width="80px"
      >
        <el-form-item label="账号"
          ><el-input placeholder="请输入账号" v-model="editSuggetList.account"
        /></el-form-item>
        <el-form-item label="建议内容"
          ><el-input type="textarea" v-model="editSuggetList.content"
        /></el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="YYYY-MM-DD HH:mm:ss"
            v-model="editSuggetList.createTime"
        /></el-form-item>
        <el-form-item label="更新时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            format="yyyy-MM-dd"
            value-format="YYYY-MM-DD HH:mm:ss"
            v-model="editSuggetList.updateTime"
            disabled
        /></el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editModel = false">取消</el-button>
        <el-button @click="editsubmitSuggest" type="primary">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from "dayjs";
import Breadcrumb from "../components/Breadcrumb";
import {
  getSuggest,
  searchSuggest,
  createSuggest,
  deleteSuggest,
  editSuggest,
} from "../utils/request";
export default {
  name: "Suggest",
  components: { Breadcrumb },
  data() {
    return {
      breadcrumbList: ["您的位置", "留言建议"],
      suggestContent: "",
      suggestList: [],
      showModel: false,
      editModel: false,
      createSugget: {},
      editSuggetList: {},
    };
  },
  mounted() {
    this.getSuggest();
  },
  methods: {
    // 格式化时间数据
    formatter(row, column, value) {
      return dayjs(value).format("YYYY-MM-DD HH:mm:ss");
    },
    // 获取所有建议
    async getSuggest() {
      const res = await getSuggest();
      this.suggestList = res.data;
    },
    // 查询建议
    async searchSuggest() {
      const res = await searchSuggest(this.suggestContent);
      if (res.code !== 0) {
        return this.$message.error("查询失败");
      }
      this.suggestList = res.data;
    },
    // 提交建议
    async submitSuggest() {
      const res = await createSuggest(this.createSugget);
      console.log(res);
      if (res.code !== 0) {
        this.$message.error("添加失败");
      }
      this.$message.success("添加成功");
      this.getSuggest();
      this.showModel = false;
    },
    // 删除意见
    async deleteSuggest(id) {
      const res = await deleteSuggest({ id });
      if (res.code !== 0) {
        this.$message.error("删除失败");
      }
      this.$message.success("删除成功");
      this.getSuggest();
    },
    // 编辑意见
    async editSugget(row) {
      row.createTime = dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss");
      row.updateTime = dayjs(row.updateTime).format("YYYY-MM-DD HH:mm:ss");
      this.editSuggetList = row;
      this.editModel = true;
    },
    // 编辑提交建议
    async editsubmitSuggest() {
      const res = await editSuggest(this.editSuggetList);
      if (res.code !== 0) {
        return this.$message.error("编辑失败");
      }
      this.$message.success("编辑成功");
      this.editModel = false;
      this.getSuggest();
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