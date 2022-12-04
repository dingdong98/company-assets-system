<template>
  <div class="indexContainer">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbList="breadcrumbList"></Breadcrumb>
    <el-card class="margin-top-20">
      <div class="searchAndAdd">
        <span>账号名称：</span>
        <el-input placeholder="请输入账号"></el-input>
        <el-button type="primary" class="margin-left-10">查询</el-button>
      </div>
      <el-table
        :data="logList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        stripe
        border
        style="width: 100%; margin-top: 40px;">
        <el-table-column prop="account" label="账号"></el-table-column>
        <el-table-column prop="requireUrl" label="请求URL"></el-table-column>
        <el-table-column prop="requireMethod" label="请求方法"></el-table-column>
        <el-table-column prop="requireParams" label="请求参数"></el-table-column>
        <el-table-column prop="requireIp" label="请求IP"></el-table-column>
        <el-table-column prop="requireTime" label="请求耗时(毫秒)"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
      </el-table>
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
  </div>
</template>

<script>
  import Breadcrumb from '../components/Breadcrumb'
  export default {
    name: 'Log',
    components: { Breadcrumb },
    data() {
      return {
        breadcrumbList: ["您的位置", "日志管理"],
        logList: [
          {account: 'admin', requireUrl: 'http://localhost:8080/', requireMethod: 'get', requireParams: '{}', requireIp: '127.0.0.1', requireTime: '1', createTime: '2022-6-29'},
          {account: 'admin', requireUrl: 'http://localhost:8080/', requireMethod: 'get', requireParams: '{}', requireIp: '127.0.0.1', requireTime: '1', createTime: '2022-6-29'},
          {account: 'admin', requireUrl: 'http://localhost:8080/', requireMethod: 'get', requireParams: '{}', requireIp: '127.0.0.1', requireTime: '1', createTime: '2022-6-29'},
          {account: 'admin', requireUrl: 'http://localhost:8080/', requireMethod: 'get', requireParams: '{}', requireIp: '127.0.0.1', requireTime: '1', createTime: '2022-6-29'},
          {account: 'admin', requireUrl: 'http://localhost:8080/', requireMethod: 'get', requireParams: '{}', requireIp: '127.0.0.1', requireTime: '1', createTime: '2022-6-29'},
          {account: 'admin', requireUrl: 'http://localhost:8080/', requireMethod: 'get', requireParams: '{}', requireIp: '127.0.0.1', requireTime: '1', createTime: '2022-6-29'},
          {account: 'admin', requireUrl: 'http://localhost:8080/', requireMethod: 'get', requireParams: '{}', requireIp: '127.0.0.1', requireTime: '1', createTime: '2022-6-29'},
          {account: 'admin', requireUrl: 'http://localhost:8080/', requireMethod: 'get', requireParams: '{}', requireIp: '127.0.0.1', requireTime: '1', createTime: '2022-6-29'},
          {account: 'admin', requireUrl: 'http://localhost:8080/', requireMethod: 'get', requireParams: '{}', requireIp: '127.0.0.1', requireTime: '1', createTime: '2022-6-29'},
        ],
        currentPage: 1,
        pageSize: 8,
        currentPage4: 1,
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val
      },
    },
  }
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