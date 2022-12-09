<template>
  <div class="elTableContainer">
    <!-- 查询借阅和添加借阅 -->
    <div class="searchAndAdd">
      <div class="inputBox">
        <span class="margin-left-10">书名：</span>
        <el-input v-model="bookName" placeholder="请输入书名"></el-input>
      </div>
      <el-button type="primary" @click="searchBookName" class="margin-left-10">查询</el-button>
      <el-button type="primary" @click="add">创建</el-button>
    </div>
    <el-table
      :data="booksArr.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
      stripe
      border
      style="width: 100%"
    >
      <el-table-column prop="bookName" label="书名"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column prop="classify" label="分类名称"></el-table-column>
      <el-table-column prop="price" label="价格"></el-table-column>
      <el-table-column prop="language" label="语言"></el-table-column>
      <el-table-column prop="inventory" label="库存"></el-table-column>
      <el-table-column label="操作" width="240px">
        <template slot-scope="scope">
          <el-button type="success  " size="mini" @click="detailBook(scope.row)">详情</el-button>
          <el-button type="primary" size="mini" @click="editBook(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="deleteBook(scope.row.bookId)">删除</el-button>
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
      :total="booksArr.length"
    >
    </el-pagination>

    <!-- 添加对话框 -->
    <el-dialog
      title="添加图书"
      :visible.sync="addBookDialog"
      width="50%"
      :before-close="handleClose">
      <el-form label-width="80px" :model="bookAdd" ref="bookAdd">
        <el-form-item label="图书名称">
          <el-input v-model="bookAdd.bookName"></el-input>
        </el-form-item>
        <el-form-item label="图书作者">
          <el-input v-model="bookAdd.author"></el-input>
        </el-form-item>
        <el-form-item label="图书类别">
          <el-select v-model="bookAdd.classify" placeholder="请选择图书类名">
            <el-option
              v-for="item in booksOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="bookAdd.press"></el-input>
        </el-form-item>
        <el-form-item label="语言">
          <el-input v-model="bookAdd.language"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="bookAdd.price"></el-input>
        </el-form-item>
        <el-form-item label="出版日期">
          <el-input v-model="bookAdd.pressTime"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="bookAdd.inventory"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="bookAdd.introduction"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addBookDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitAdd(bookAdd)">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 详情对话框 -->
    <el-dialog
      title="图书详情"
      :visible.sync="bookDetailDialog"
      width="50%"
      :before-close="handleClose">
      <el-descriptions title="" border>
        <el-descriptions-item label="图书名称">{{bookDetail.bookName}}</el-descriptions-item>
        <el-descriptions-item label="图书作者">{{bookDetail.author}}</el-descriptions-item>
        <el-descriptions-item label="图书类别">{{bookDetail.classify}}</el-descriptions-item>
        <el-descriptions-item label="出版社">{{bookDetail.press}}</el-descriptions-item>
        <el-descriptions-item label="语言">{{bookDetail.language}}</el-descriptions-item>
        <el-descriptions-item label="价格">{{bookDetail.price}}</el-descriptions-item>
        <el-descriptions-item label="库存">{{bookDetail.inventory}}</el-descriptions-item>
        <el-descriptions-item label="出版日期">{{bookDetail.pressTime}}</el-descriptions-item>
        <el-descriptions-item label="创建日期">{{bookDetail.createTime}}</el-descriptions-item>
        <el-descriptions-item label="介绍">{{bookDetail.introduction}}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 编辑对话框 -->
    <el-dialog
      title="编辑图书"
      :visible.sync="bookEditDialog"
      width="50%"
      :before-close="handleClose">
      <el-form label-width="80px" :model="bookEdit">
        <el-form-item label="图书名称">
          <el-input v-model="bookEdit.bookName"></el-input>
        </el-form-item>
        <el-form-item label="图书作者">
          <el-input v-model="bookEdit.author"></el-input>
        </el-form-item>
        <el-form-item label="图书类别">
          <el-select v-model="bookEdit.classify" placeholder="请选择图书类名">
            <el-option
              v-for="item in booksOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="bookEdit.press"></el-input>
        </el-form-item>
        <el-form-item label="语言">
          <el-input v-model="bookEdit.language"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="bookEdit.price"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="bookEdit.inventory"></el-input>
        </el-form-item>
        <el-form-item label="出版日期">
          <el-input v-model="bookEdit.pressTime"></el-input>
        </el-form-item>
        <el-form-item label="介绍">
          <el-input v-model="bookEdit.introduction"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="bookEditDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit(bookEdit)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: ['booksArr', 'deleteBookById', 'editBookInfo', 'booksOptions', 'createBook', 'getKeyword'],
    data() {
      return {
        currentPage: 1,
        pageSize: 8,
        currentPage4: 1,
        bookName: '',
        author: '',
        selectValue: '',
        bookDetailDialog: false, // 图书详情对话框
        bookDetail: {},
        bookEditDialog: false,   // 图书编辑对话框
        bookEdit: {},
        addBookDialog: false,    // 添加图书对话框
        bookAdd: {},
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
      searchBookName() {
        this.getKeyword(this.bookName)
      },
      // 点击添加按钮
      add() {
        this.addBookDialog = true
      },
      // 提交添加的图书信息
      submitAdd(addForm) {
        // console.log(addForm);
        this.createBook(addForm)
        this.bookAdd = {}
        this.addBookDialog = false
      },
      // 图书详情
      detailBook(bookInfo) {
        this.bookDetailDialog = true
        this.bookDetail = bookInfo
      },
      // 编辑图书
      editBook(bookInfo) {
        this.bookEditDialog = true
        this.bookEdit = bookInfo
      },
      // 删除图书
      deleteBook(bookId) {
        this.deleteBookById(bookId)
      },
      handleClose() {
        this.bookDetailDialog = false
        this.bookEditDialog = false
        this.addBookDialog = false
      },
      // 提交编辑后的图书信息
      submitEdit(bookInfo) {
        this.$confirm('确认提交？')
          .then(() => {
            this.editBookInfo(bookInfo)
            this.bookEditDialog = false
          })
          .catch(error => {
            this.$message.error(error)
          });
      }
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