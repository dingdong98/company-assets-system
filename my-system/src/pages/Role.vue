<template>
  <div class="indexContainer">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbList="breadcrumbList"></Breadcrumb>
    <el-card class="margin-top-20">
      <div class="searchAndAdd">
        <span>角色名称：</span>
        <el-input v-model="account" placeholder="请输入账号"></el-input>
        <el-button type="primary" class="margin-left-10">查询</el-button>
        <el-button type="primary">创建</el-button>
      </div>
      <el-table
        :data="roleList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
        stripe
        border
        style="width: 100%; margin-top: 40px;">
        <el-table-column prop="roleName" label="名称"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column label="操作" width="160">
          <template>
            <el-button type="success" size="mini">编辑</el-button>
            <el-button type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 20px; text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[6, 8, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="roleList.length"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
  import Breadcrumb from '../components/Breadcrumb'
  export default {
    name: 'Role',
    components: { Breadcrumb },
    data() {
      return {
        breadcrumbList: ["您的位置", "角色管理"],
        roleList: [
          {roleName: '超级管理员', remark: '超级管理员权限', createTime: '2022-06-29', updateTime: '2022-06-29'},
          {roleName: '普通读者', remark: '普通读者权限', createTime: '2022-06-29', updateTime: '2022-06-29'},
        ],
        currentPage: 1,
        pageSize: 8,
        currentPage4: 1,
        account: ''
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