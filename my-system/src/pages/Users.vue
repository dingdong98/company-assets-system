<template>
  <div class="indexContainer">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbList="breadcrumbList"></Breadcrumb>
    <el-card class="margin-top-20">
      <div class="searchAndAdd">
        <span class="margin-left-10">用户名：</span>
        <el-input v-model="userName" placeholder="请输入用户名"></el-input>
        <el-button type="primary" @click="searchUser" class="margin-left-10"
          >查询</el-button
        >
        <el-button type="primary" @click="addUser">创建</el-button>
      </div>
      <el-table
        :data="
          userList.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        stripe
        border
        style="width: 100%; margin-top: 40px"
      >
        <el-table-column
          prop="account"
          label="账号"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="100"
        ></el-table-column>
        <el-table-column prop="sex" label="性别" width="60"></el-table-column>
        <el-table-column prop="role" label="角色" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.role === 0">超级管理员</span>
            <span v-else>普通用户</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width="120"
        ></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column label="操作" width="160">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editUser(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="deleteUser(scope.row.userId)"
              >删除</el-button
            >
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
        :total="userList.length"
      >
      </el-pagination>
    </el-card>

    <!-- 编辑用户信息 -->
    <el-dialog
      title="编辑用户信息"
      :visible.sync="userEditDialog"
      width="40%"
      :before-close="handleCreateClose"
    >
      <el-form label-width="80px" :model="userInfo">
        <el-form-item label="账号">
          <el-input v-model="userInfo.account" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="userInfo.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio v-model="userInfo.sex" label="男">男</el-radio>
          <el-radio v-model="userInfo.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="角色">
          <el-input v-model="userInfo.role"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="userInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="userInfo.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="userInfo.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit(userInfo)"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 创建用户 -->
    <el-dialog
      title="创建用户"
      :visible.sync="userCreateDialog"
      width="40%"
      :before-close="handleCreateClose"
    >
      <el-form
        label-width="80px"
        :model="createUser"
        ref="createUser"
        :rules="userRules"
      >
        <el-form-item label="账号" prop="account">
          <el-input v-model="createUser.account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="createUser.password" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="userName">
          <el-input v-model="createUser.userName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio v-model="createUser.sex" label="男">男</el-radio>
          <el-radio v-model="createUser.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="createUser.role" placeholder="请选择角色">
            <el-option
              v-for="item in roleOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="createUser.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="createUser.email"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="createUser.remark"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="userCreateDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitCreate(createUser)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  createUser,
  searchUser,
  editUser,
  deleteUser,
} from "@/utils/request";
import Breadcrumb from "../components/Breadcrumb";
export default {
  name: "Users",
  components: { Breadcrumb },
  data() {
    return {
      breadcrumbList: ["您的位置", "用户管理"],
      userName: "",
      userList: [],
      currentPage: 1,
      pageSize: 8,
      currentPage4: 1,
      userInfo: {},
      userEditDialog: false,
      userCreateDialog: false,
      createUser: {
        account: "",
        password: "123456",
        userName: "",
        sex: "",
        role: 1,
        phone: "",
        email: "",
        status: 1,
        remark: "",
      },
      roleOptions: [
        {
          value: 1,
          label: "超级管理员",
        },
        {
          value: 0,
          label: "普通用户",
        },
      ],
      userRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getAllUsers();
  },
  methods: {
    // 获取所有用户
    async getAllUsers() {
      const res = await getUserList();
      if (res.code !== 0) {
        return this.$message.error("获取失败！");
      }
      this.userList = res.data;
    },
    // 查询用户
    async searchUser() {
      const res = await searchUser(this.userName);
      if (res.code !== 0) {
        this.$message.error("查询失败！");
      }
      this.$message.success(res.msg);
      this.userList = res.data;
      this.userName = "";
    },
    // 添加用户
    addUser() {
      this.userCreateDialog = true;
    },
    // 编辑用户
    editUser(userInfo) {
      let user = { ...userInfo };
      if (user.status === 1) {
        user.status = true;
      } else {
        user.status = false;
      }
      this.userInfo = user;
      this.userEditDialog = true;
    },
    // 删除用户
    deleteUser(userId) {
      this.$confirm("确认删除？").then(async () => {
        const res = await deleteUser({ userId });
        if (res.code !== 0) {
          return this.$message.error("删除失败！");
        }
        this.$message.success(res.msg);
        this.getAllUsers();
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    // 提交编辑后的用户信息
    async submitEdit(userInfo) {
      if (userInfo.status) {
        userInfo.status = 1;
      } else {
        userInfo.status = 0;
      }
      const res = await editUser(userInfo);
      if (res.code !== 0) {
        this.$message.error("编辑失败！");
      }
      this.$message.success(res.msg);
      this.getAllUsers();
      this.userEditDialog = false;
    },
    // 创建用户
    submitCreate(userInfo) {
      const dateTime = new Date();
      userInfo.createTime = this.$moment(dateTime).format(
        "YYYY-MM-DD HH:DD:SS"
      );
      this.$refs["createUser"].validate(async (valid) => {
        if (valid) {
          const res = await createUser(userInfo);
          if (res.code !== 0) {
            this.$message.error("添加失败");
          }
          this.$message.success(res.msg);
          this.getAllUsers();
          this.userCreateDialog = false;
          this.$refs["createUser"].resetFields();
        } else {
          return false;
        }
      });
    },
    handleCreateClose() {
      this.userEditDialog = false;
      this.userCreateDialog = false;
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