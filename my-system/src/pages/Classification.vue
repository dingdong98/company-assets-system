<template>
  <div class="classificationContainer">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbList="breadcrumbList"></Breadcrumb>
    <el-card class="classificationBox">
      <!-- 查询分类和添加分类 -->
      <div class="searchAndAdd">
        <el-input
          placeholder="请输入分类名"
          suffix-icon="el-icon-search"
          v-model="keyword"
        ></el-input>
        <el-button type="primary" @click="searchClassName">查询</el-button>
        <el-button type="primary" @click="showAddDialog = true">添加</el-button>
      </div>
      <!-- 表格 -->
      <el-table
        :data="
          classificationData.slice(
            (currentPage - 1) * pageSize,
            currentPage * pageSize
          )
        "
        border
        stripe
        style="width: 100%"
      >
        <el-table-column label="ID" type="index"></el-table-column>
        <el-table-column prop="className" label="分类名"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"> </el-table-column>
        <el-table-column prop="note" label="备注"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="editClass(scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" size="mini" @click="delClass(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        style="margin-top: 20px; text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[6, 8, 10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="classificationData.length"
      >
      </el-pagination>
    </el-card>

    <!-- 添加弹框 -->
    <el-dialog title="添加图书分类" :visible.sync="showAddDialog" width="40%">
      <el-form :model="addClassData" ref="addRef" label-width="80px">
        <el-form-item label="分类名" prop="className">
          <el-input v-model="addClassData.className"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="classNote">
          <el-input v-model="addClassData.note"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="addClassification">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="修改图书分类" :visible.sync="showEditDialog" width="40%">
      <el-form :model="editClassData" label-width="80px">
        <el-form-item label="分类名" prop="className">
          <el-input v-model="editClassData.className"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="editClassData.note"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <el-input v-model="editClassData.createTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="更新时间" prop="updateTime">
          <el-input v-model="editClassData.updateTime" disabled></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitEditClassify">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb";
import {
  createClassify,
  deleteClassify,
  editClassify,
  getAssetsClassify,
  searchClassify,
} from "../utils/request";
export default {
  name: "AssetsClassify",
  components: { Breadcrumb },
  data() {
    return {
      breadcrumbList: ["您的位置", "资产分类"],
      keyword: "", //输入的分类名
      classificationData: [],
      showAddDialog: false, // 添加分类弹框
      showEditDialog: false, // 修改分类弹框
      addClassData: {
        className: "",
        note: "",
      },
      editClassData: {},
      currentPage: 1,
      pageSize: 8,
      currentPage4: 1,
    };
  },
  mounted() {
    this.getClassify();
  },
  methods: {
    // 获取分类
    async getClassify() {
      const res = await getAssetsClassify();
      if (res.code !== 0) {
        return this.$message.error("获取分类失败！");
      }
      this.classificationData = res.data;
      /* getRequest("/classify").then((resp) => {
        console.log(resp);
        if (resp.code !== 0) {
          this.$message.error("获取图书分类失败！");
          return;
        }
        this.classificationData = resp.data;
      }); */
    },
    // 添加分类
    async addClassification() {
      const dateTime = new Date();
      this.addClassData.createTime = this.$moment(dateTime).format(
        "YYYY-MM-DD HH:DD:SS"
      );
      this.addClassData.updateTime = "";
      const res = await createClassify(this.addClassData);
      if (res.code !== 0) {
        return this.$message.error("添加失败！");
      }
      this.$message.success(res.msg);
      this.getClassify();
      this.$refs.addRef.resetFields();
      this.showAddDialog = false;
    },
    // 查询分类名
    async searchClassName() {
      console.log(this.keyword);
      const res = await searchClassify(this.keyword);
      console.log(res);
      if (res.code !== 0) {
        return this.$message.error("查询失败！");
      }
      this.$message.success(res.msg);
      this.classificationData = res.data;
      this.keyword = "";
    },
    // 点击编辑显示编辑弹框，并把相关数据放进去
    editClass(editData) {
      console.log(editData);
      this.showEditDialog = true;
      this.editClassData = editData;
    },
    // 提交编辑后的数据
    async submitEditClassify() {
      const dateTime = new Date();
      this.editClassData.updateTime = this.$moment(dateTime).format(
        "YYYY-MM-DD HH:DD:SS"
      );
      const res = await editClassify(this.editClassData);
      if (res.code !== 0) {
        return this.$message.error("编辑失败!");
      }
      this.$message.success(res.msg);
      this.getClassify();
      this.showEditDialog = false;
    },
    // 删除分类
    delClass(id) {
      this.$confirm("是否删除?")
        .then(async () => {
          const res = await deleteClassify({ id });
          if (res.code !== 0) {
            return this.$message.error("删除失败!");
          }
          this.$message.success(res.msg);
          this.getClassify();
        })
        .catch(() => {
          this.$message.info("取消删除操作");
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
};
</script>

<style lang="less" scoped>
.classificationContainer {
  width: 100%;
  margin-bottom: 60px;
}
.classificationBox {
  width: 100%;
  margin-top: 20px;
  .searchAndAdd {
    width: 100%;
    display: flex;
    margin-bottom: 40px;
    .el-input {
      width: 300px;
      margin-right: 20px;
    }
  }
}
</style>