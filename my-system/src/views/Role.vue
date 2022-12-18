<template>
  <div class="indexContainer">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbList="breadcrumbList"></Breadcrumb>
    <el-card class="margin-top-20">
      <div class="searchAndAdd">
        <span>角色名称：</span>
        <el-input
          v-model="rolename"
          placeholder="请输入要查询的角色名称"
        ></el-input>
        <el-button type="primary" class="margin-left-10" @click="searchRole"
          >查询</el-button
        >
        <el-button type="primary" @click="showModel = true">创建</el-button>
      </div>
      <!-- 主体页面 -->
      <el-table
        :data="roleList"
        stripe
        border
        style="width: 100%; margin-top: 40px"
      >
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="rolename" label="角色"></el-table-column>
        <el-table-column prop="remark" label="备注信息"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="showEditRoleModel(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleteRole(scope.row.roleId)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 新增页面 -->
    <el-dialog title="创建角色" :visible.sync="showModel" width="50%">
      <el-form :model="createRole" ref="RoleForm" label-width="80px">
        <el-form-item label="角色"
          ><el-input placeholder="请输入角色" v-model="createRole.rolename"
        /></el-form-item>
        <el-form-item label="备注信息"
          ><el-input placeholder="请输入备注信息" v-model="createRole.remark"
        /></el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="showModel = false">取消</el-button>
        <el-button @click="submitRole('ruleForm')" type="primary"
          >确认</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑页面 -->
    <el-dialog title="编辑角色" :visible.sync="editRoleModel" width="50%">
      <el-form :model="editRole" ref="editRoleForm" label-width="80px">
        <el-form-item label="角色"
          ><el-input placeholder="请输入角色" v-model="editRole.rolename"
        /></el-form-item>
        <el-form-item label="备注信息"
          ><el-input placeholder="请输入备注信息" v-model="editRole.remark"
        /></el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="editRoleModel = false">取消</el-button>
        <el-button @click="editRoleSubmit('editRoleForm')" type="primary"
          >确认</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb";
import {
  getRoleList,
  editRole,
  deleteRole,
  createRole,
  searchRole,
} from "../utils/request";
export default {
  name: "Role",
  components: { Breadcrumb },
  data() {
    return {
      breadcrumbList: ["您的位置", "角色管理"],
      roleList: [],
      rolename: "",
      showModel: false,
      editRoleModel: false,
      createRole: {},
      editRole: {},
    };
  },
  mounted() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const res = await getRoleList();
      if (res.code !== 0) {
        return this.$message.error("请求失败！");
      }
      this.roleList = res.data;
    },
    async searchRole() {
      const res = await searchRole(this.rolename);
      if (res.code !== 0) {
        return this.$message.error("请求失败！");
      }
      this.$message.success("查询成功！");
      this.roleList = res.data;
    },
    showEditRoleModel(row) {
      // 浅拷贝
      let roleObj = { ...row };
      this.editRole = roleObj;
      this.editRoleModel = true;
    },
    async editRoleSubmit() {
      const res = await editRole(this.editRole);
      console.log(res);
      if (res.code !== 0) {
        return this.$message.error("编辑失败！");
      }
      this.$message.success("编辑成功！");
      this.editRoleModel = false;
      this.getRoleList();
    },
    async deleteRole(roleId) {
      if (roleId === 1) {
        return this.$message.error("超级管理员角色不允许删除！！");
      }
      const res = await deleteRole({ roleId });
      if (res.code !== 0) {
        return this.$message.error("删除失败！");
      }
      this.$message.success("删除成功！");
      this.getRoleList();
    },
    async submitRole(formName) {
      console.log(formName);
      const res = await createRole(this.createRole);
      if (res.code !== 0) {
        return this.$message.error("添加失败！");
      }
      this.$message.success("添加成功！");
      this.showModel = false;
      this.getRoleList();
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