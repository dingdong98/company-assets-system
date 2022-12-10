<template>
  <div class="elTableContainer">
    <!-- 搜索框 -->
    <div class="searchAndAdd">
      <div class="inputBox">
        <span class="margin-left-10">资产名称：</span>
        <el-input
          v-model="assectName"
          placeholder="请输入要查找资产名称"
        ></el-input>
      </div>
      <el-button type="primary" @click="searchAssectName" class="margin-left-10"
        >查询</el-button
      >
      <el-button type="primary" @click="add">创建</el-button>
    </div>
    <!-- 主体页面 -->
    <el-table
      :data="
        assectsArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      stripe
      border
      style="width: 100%"
    >
      <el-table-column prop="assectName" label="资产名称"></el-table-column>
      <el-table-column prop="author" label="资产归属人"></el-table-column>
      <el-table-column prop="classify" label="资产分类"></el-table-column>
      <el-table-column prop="price" label="资产单价"></el-table-column>
      <el-table-column prop="number" label="库存数量"></el-table-column>
      <el-table-column prop="photo" label="资产图片"></el-table-column>
      <el-table-column label="操作" width="240px">
        <template slot-scope="scope">
          <el-button
            type="success  "
            size="mini"
            @click="detailAssect(scope.row)"
            >详情</el-button
          >
          <el-button type="primary" size="mini" @click="editAssect(scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="deleteAssect(scope.row.assectId)"
            >删除</el-button
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
      :total="assectsArr.length"
    >
    </el-pagination>

    <!-- 添加对话框 -->
    <el-dialog
      title="添加资产"
      :visible.sync="addAssectDialog"
      width="50%"
      :before-close="handleClose"
    >
      <el-form label-width="100px" :model="assectAdd" ref="assectAdd">
        <el-form-item label="资产名称">
          <el-input v-model="assectAdd.assectName"></el-input>
        </el-form-item>
        <el-form-item label="资产归属人">
          <el-input v-model="assectAdd.author"></el-input>
        </el-form-item>
        <el-form-item label="资产类别">
          <el-select
            v-model="assectAdd.classify"
            placeholder="请选择资产所属类别"
          >
            <el-option
              v-for="item in assectsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="资产价格">
          <el-input v-model="assectAdd.price"></el-input>
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="assectAdd.number"></el-input>
        </el-form-item>
        <el-form-item label="详细介绍">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
            v-model="assectAdd.introduction"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addAssectDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd(assectAdd)"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 详情对话框 -->
    <el-dialog
      title="资产详情"
      :visible.sync="assectDetailDialog"
      width="50%"
      :before-close="handleClose"
    >
      <el-descriptions title="" border>
        <el-descriptions-item label="资产名称">{{
          assectDetail.assectName
        }}</el-descriptions-item>
        <el-descriptions-item label="资产归属人">{{
          assectDetail.author
        }}</el-descriptions-item>
        <el-descriptions-item label="资产类别">{{
          assectDetail.classify
        }}</el-descriptions-item>
        <el-descriptions-item label="资产单价">{{
          assectDetail.price
        }}</el-descriptions-item>
        <el-descriptions-item label="库存数量">{{
          assectDetail.number
        }}</el-descriptions-item>
        <el-descriptions-item label="创建日期">{{
          assectDetail.createTime
        }}</el-descriptions-item>
        <el-descriptions-item label="资产介绍">{{
          assectDetail.introduction
        }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑资产"
      :visible.sync="assectEditDialog"
      width="50%"
      :before-close="handleClose"
    >
      <el-form label-width="100px" :model="assectEdit">
        <el-form-item label="资产名称">
          <el-input v-model="assectEdit.assectName"></el-input>
        </el-form-item>
        <el-form-item label="资产归属人">
          <el-input v-model="assectEdit.author"></el-input>
        </el-form-item>
        <el-form-item label="资产分类">
          <el-select
            v-model="assectEdit.classify"
            placeholder="请选择资产所属类别"
          >
            <el-option
              v-for="item in assectsOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="assectEdit.price"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="assectEdit.number"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="assectEdit.introduction"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="assectEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit(assectEdit)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: [
    "assectsArr",
    "deleteAssectById",
    "editAssectInfo",
    "assectsOptions",
    "createAssect",
    "searchAssect",
  ],
  data() {
    return {
      currentPage: 1,
      pageSize: 8,
      currentPage4: 1,
      assectName: "",
      author: "",
      selectValue: "",
      assectDetailDialog: false, // 图书详情对话框
      assectDetail: {},
      assectEditDialog: false, // 图书编辑对话框
      assectEdit: {},
      addAssectDialog: false, // 添加图书对话框
      assectAdd: {},
    };
  },
  methods: {
    // 使用了size-change和current-change事件来处理页码大小和当前页变动时候触发的事件
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    // 查询资产信息
    searchAssectName() {
      this.searchAssect(this.assectName);
    },
    // 点击创建按钮
    add() {
      this.addAssectDialog = true;
    },
    // 提交资产信息
    submitAdd(addForm) {
      this.createAssect(addForm);
      this.assectAdd = {};
      this.addAssectDialog = false;
    },
    // 资产详情
    detailAssect(assectInfo) {
      this.assectDetailDialog = true;
      this.assectDetail = assectInfo;
    },
    // 编辑资产
    editAssect(assectInfo) {
      this.assectEditDialog = true;
      this.assectEdit = assectInfo;
    },
    // 删除资产
    deleteAssect(assectId) {
      console.log(assectId)
      this.deleteAssectById(assectId);
    },
    // before-close 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效
    handleClose() {
      this.assectDetailDialog = false;
      this.assectEditDialog = false;
      this.addAssectDialog = false;
    },
    // 提交编辑后的资产信息
    submitEdit(assectInfo) {
      this.$confirm("确认提交？")
        .then(() => {
          this.editAssectInfo(assectInfo);
          this.assectEditDialog = false;
        })
        .catch((error) => {
          this.$message.error(error);
        });
    },
  },
  mounted() {
    console.log(this.assectsArr);
  },
};
</script>

<style lang="less" scoped>
.searchAndAdd {
  // margin-top: 20px;
  width: 100%;
  display: flex;
  margin-bottom: 40px;
  .el-input {
    width: 200px;
    // margin-right: 20px;
  }
}
.margin-left-10 {
  margin-left: 10px;
}
</style>