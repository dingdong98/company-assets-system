<template>
  <div class="indexContainer">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbList="breadcrumbList"></Breadcrumb>
    <el-card>
      <BooksTable
        :booksArr="booksArr"
        :booksOptions="booksOptions"
        :deleteBookById="deleteBookById"
        :editBookInfo="editBookInfo"
        :createBook="createBook"
        :getKeyword="getKeyword"
      ></BooksTable>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb";
import BooksTable from "../components/BooksTable.vue";
import {
  getAssetsList,
  getAssetsClassify,
  deleteAssets,
  editAssets,
  createAssets,
  searchAssets,
} from "../utils/request";
export default {
  name: "Assets",
  data() {
    return {
      breadcrumbList: ["您的位置", "资产管理"],
      tabName: "first",
      tableArr: [], // 所有图书
      toBePaid: [], // 我的借阅
      booksArr: [],
      booksOptions: [], //  图书分类
    };
  },
  components: { Breadcrumb, BooksTable },
  mounted() {
    this.getBooksList();
    this.getClassify();
  },
  methods: {
    // 获取资产列表
    async getBooksList() {
      try {
        const res = await getAssetsList();
        if (res.code !== 0) {
          return this.$message.error("获取资产列表数据失败！");
        }
        this.booksArr = res.data;
      } catch (error) {
        this.$message.error(error);
      }
    },
    // 获取资产分类
    async getClassify() {
      try {
        const res = await getAssetsClassify();
        if (res.code !== 0) {
          return this.$message.error("获取资产分类数据失败");
        }
        res.data.filter((item) => {
          let classify = {};
          classify.value = item.className;
          classify.label = item.className;
          this.booksOptions.push(classify);
        });
      } catch (error) {
        this.$message.error(error);
      }
      /* getRequest("/classify").then((resp) => {
        console.log(resp);
        if (resp.code !== 0) {
          this.$message.error("获取图书分类失败！");
          return;
        }
        resp.data.filter((item) => {
          let classify = {};
          classify.value = item.className;
          classify.label = item.className;
          this.booksOptions.push(classify);
        });
      }); */
    },
    // 删除资产
    deleteBookById(bookId) {
      // TODO
      console.log(bookId);
      this.$confirm("是否删除").then(async () => {
        const res = deleteAssets({ bookId });
        if (res.code !== 0) {
          return this.$message.error("删除失败!");
        }
        this.$message.success("删除成功");
        this.getBooksList();
      });
      /* console.log(bookId);
      this.$confirm("确认删除？")
        .then(() => {
          postRequest("/books/delete", { bookId }).then((resp) => {
            if (resp.code !== 0) {
              this.$message.error("删除失败！");
            }
            this.$message.success(resp.msg);
            this.getBooksList();
          });
        })
        .catch((error) => {
          this.$message.error(error);
        }); */
    },
    // 编辑资产
    async editBookInfo(bookInfo) {
      const res = await editAssets(bookInfo);
      if (res.code !== 0) {
        return this.$message.error("编辑失败");
      }
      this.$message.success(res.msg);
      this.getBooksList();
      /*  postRequest("/books/edit", bookInfo).then((resp) => {
        if (resp.code !== 0) {
          this.$message.error("添加失败！");
        }
        this.$message.success(resp.msg);
        this.getBooksList();
      }); */
    },
    // 创建资产
    async createBook(bookInfo) {
      const dateTime = new Date();
      bookInfo.createTime = this.$moment(dateTime).format(
        "YYYY-MM-DD HH:DD:SS"
      );
      const res = await createAssets(bookInfo);
      if (res.code !== 0) {
        return this.$message.error("创建失败");
      }
      this.$message.success(res.msg);
      this.getBooksList();
      /* const dateTime = new Date();
      bookInfo.createTime = this.$moment(dateTime).format(
        "YYYY-MM-DD HH:DD:SS"
      );
      postRequest("/books/add", bookInfo).then((resp) => {
        if (resp.code !== 0) {
          this.$message.error("添加失败！");
        }
        this.$message.success(resp.msg);
        this.getBooksList();
      }); */
    },
    // 查询资产
    async getKeyword(keyword) {
      const res = await searchAssets(keyword);
      if (res.code !== 0) {
        return this.$message.error("查询失败");
      }
      this.$message.success(res.msg);
      this.booksArr = res.data;
      /* console.log(keyword);
      getRequest("/books/search", { bookName: keyword }).then((resp) => {
        if (resp.code !== 0) {
          this.$message.error("查询失败！");
        }
        this.$message.success(resp.msg);
        this.booksArr = resp.data;
      }); */
    },
  },
};
</script>

<style lang="less" scoped>
.indexContainer {
  margin-bottom: 60px;
}
.el-card {
  margin-top: 20px;
}
</style>