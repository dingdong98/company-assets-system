<template>
  <div class="elTableContainer">
    <!-- 查询借阅和添加借阅 -->
    <div class="searchAndAdd">
      <el-input
        placeholder="请输入账号"
        suffix-icon="el-icon-search"
        v-model="localKeyword"
      ></el-input>
      <el-button type="primary" @click="searchAccount">查询</el-button>
      <el-button type="primary" v-if="tabName === 'second'" @click="add"
        >添加租借</el-button
      >
      <el-button type="success" v-if="tabName === 'third'" @click="update"
        >更新</el-button
      >
    </div>
    <!-- 主体 -->
    <el-table
      :data="
        tableArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      border
      style="width: 100%"
    >
      <el-table-column label="ID" type="index"> </el-table-column>
      <el-table-column prop="account" label="账号"> </el-table-column>
      <el-table-column prop="assectName" label="资产名称"> </el-table-column>
      <el-table-column prop="borrowTime" label="租借时间"> </el-table-column>
      <el-table-column prop="planReturnTime" label="计划归还时间">
      </el-table-column>
      <el-table-column
        prop="returnTime"
        v-if="tabName !== 'four'"
        label="实际归还时间"
      >
      </el-table-column>
      <el-table-column label="操作" v-if="tabName === 'second'" align="center">
        <template slot-scope="scope">
          <el-button type="success" size="mini" @click="returnBook(scope.row)"
            >归还</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="tabName === 'four'" align="center">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            @click="agreeBorrowSubmit(scope.row)"
            >同意租借</el-button
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
      :total="tableArr.length"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: [
    "tableArr",
    "getKeyword",
    "keyword",
    "tabName",
    "getAddBtn",
    "returnAssectById",
    "getPlanTime",
    "agreeBorrow",
  ],
  data() {
    return {
      currentPage: 1,
      pageSize: 8,
      currentPage4: 1,
      localKeyword: this.keyword,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    searchAccount() {
      console.log(this.localKeyword);
      this.getKeyword(this.localKeyword);
    },
    // 点击添加按钮
    add() {
      this.getAddBtn(true);
    },
    // 更新
    update() {
      this.getPlanTime();
    },
    // 归还（更新数据库中当前数据，status改为0，日期改为当前时间）
    returnBook(scope) {
      this.returnAssectById(scope.id);
    },
    // 同意租借（更新数据库中当前数据，status改为0，日期改为当前时间）
    agreeBorrowSubmit(scope) {
      this.agreeBorrow(scope.id);
    },
  },
};
</script>

<style lang="less" scoped>
.searchAndAdd {
  margin-top: 20px;
  width: 100%;
  display: flex;
  margin-bottom: 40px;
  .el-input {
    width: 300px;
    margin-right: 20px;
  }
}
</style>