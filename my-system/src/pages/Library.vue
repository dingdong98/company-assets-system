<!-- eslint-disable no-unused-vars -->
<template>
  <div class="indexContainer">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbList="breadcrumbList"></Breadcrumb>
    <el-card>
      <BooksTable :booksArr="booksArr" :booksOptions="booksOptions" :deleteBookById="deleteBookById" :editBookInfo="editBookInfo" :createBook="createBook" :getKeyword="getKeyword"></BooksTable>
    </el-card>
  </div>
</template>

<script>
  import Breadcrumb from '../components/Breadcrumb'
  import BooksTable from '../components/BooksTable'
  import {getRequest, postRequest} from '../untils/api'
  export default {
    name: 'Library',
    data() {
      return {
        breadcrumbList: ["您的位置", "图书管理"],
        tabName: 'first',
        tableArr: [],   // 所有图书
        toBePaid: [],   // 我的借阅
        booksArr: [],
        booksOptions: []   //  图书分类
      }
    },
    components: {Breadcrumb, BooksTable},
    mounted() {
      this.getBooksList()
      this.getClassify()
    },
    methods: {
      // 获取图书
      getBooksList() {
        getRequest('/books').then(resp => {
          if(resp.code !== 0) {
            this.$message.error("获取失败！")
          }
          this.booksArr = resp.data
        })
      },
      // 获取图书分类
      getClassify() {
        getRequest('/classify').then(resp => {
        console.log(resp);
        if(resp.code !== 0) {
          this.$message.error('获取图书分类失败！')
          return
        }
        resp.data.filter(item => {
          let classify = {}
          classify.value = item.className
          classify.label = item.className
          this.booksOptions.push(classify)
        })
      })
      },
      // 删除图书
      deleteBookById(bookId) {
        console.log(bookId)
        this.$confirm('确认删除？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            postRequest('/books/delete', {bookId}).then(resp => {
              if(resp.code !== 0) {
                this.$message.error('删除失败！')
              }
              this.$message.success(resp.msg)
              this.getBooksList()
            })
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {});
      },
      // 编辑图书
      editBookInfo(bookInfo) {
        postRequest('/books/edit', bookInfo).then(resp => {
          if(resp.code !== 0) {
            this.$message.error('添加失败！')
          }
          this.$message.success(resp.msg)
          this.getBooksList()
        })
      },
      // 创建图书
      createBook(bookInfo) {
        const dateTime = new Date()
        bookInfo.createTime = this.$moment(dateTime).format('YYYY-MM-DD HH:DD:SS')
        postRequest('/books/add', bookInfo).then(resp => {
          if(resp.code !== 0) {
            this.$message.error('添加失败！')
          }
          this.$message.success(resp.msg)
          this.getBooksList()
        })
      },
      // 查询图书
      getKeyword(keyword) {
        console.log(keyword);
        getRequest('/books/search', {bookName: keyword}).then(resp => {
          if(resp.code !== 0) {
            this.$message.error('查询失败！')
          }
          this.$message.success(resp.msg)
          this.booksArr = resp.data
        })
      }
    },
  }
</script>

<style lang="less" scoped>
  .indexContainer {
    margin-bottom: 60px;
  }
  .el-card {
    margin-top: 20px;
  }
</style>