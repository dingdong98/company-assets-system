<template>
  <div class="indexContainer">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbList="breadcrumbList"></Breadcrumb>
    <el-card>
      <AssectsTable
        :assectsArr="assectsArr"
        :assectsOptions="assectsOptions"
        :deleteAssectById="deleteAssectById"
        :editAssectInfo="editAssectInfo"
        :createAssect="createAssect"
        :searchAssect="searchAssect"
      ></AssectsTable>
    </el-card>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb";
import AssectsTable from "@/components/AssectsTable.vue";
import {
  getAssectsList,
  getAssectsClassify,
  deleteAssects,
  editAssects,
  createAssects,
  searchAssects,
  setPhoto,
} from "../utils/request";
export default {
  name: "Assets",
  data() {
    return {
      breadcrumbList: ["您的位置", "资产管理"],
      tabName: "first",
      tableArr: [], // 所有图书
      toBePaid: [], // 我的借阅
      assectsArr: [], //资产列表
      assectsOptions: [], //  资产分类
    };
  },
  components: { Breadcrumb, AssectsTable },
  mounted() {
    this.getAssectsList();
    this.getClassify();
  },
  methods: {
    // 获取资产列表
    async getAssectsList() {
      try {
        const res = await getAssectsList();
        if (res.code !== 0) {
          return this.$message.error("获取资产列表数据失败！");
        }
        this.assectsArr = res.data;
      } catch (error) {
        this.$message.error(error);
      }
    },
    // 获取资产分类
    async getClassify() {
      try {
        const res = await getAssectsClassify();
        if (res.code !== 0) {
          return this.$message.error("获取资产分类数据失败");
        }
        res.data.filter((item) => {
          let classify = {};
          classify.value = item.className;
          classify.label = item.className;
          this.assectsOptions.push(classify);
        });
      } catch (error) {
        this.$message.error(error);
      }
    },
    // 删除资产
    deleteAssectById(assectId) {
      this.$confirm("是否删除").then(async () => {
        console.log(assectId);
        const res = await deleteAssects({ assectId });
        if (res.code !== 0) {
          return this.$message.error("删除失败!");
        }
        this.$message.success("删除成功");
        this.getAssectsList();
      });
    },
    // 编辑资产
    async editAssectInfo(assectInfo) {
      console.log(assectInfo);
      const res = await editAssects(assectInfo);
      if (res.code !== 0) {
        return this.$message.error("编辑失败");
      }
      this.$message.success(res.msg);
      this.getAssectsList();
    },
    // 创建资产
    async createAssect(assectInfo, filename) {
      console.log(filename);
      console.log(assectInfo);
      const dateTime = new Date();
      assectInfo.createTime = this.$moment(dateTime).format(
        "YYYY-MM-DD HH:DD:SS"
      );
      const res1 = await createAssects(assectInfo);
      if (res1.code !== 0) {
        return this.$message.error("创建失败");
      }
      const res2 = await setPhoto({ ...assectInfo, filename });
      if (res2.code !== 0) {
        return this.$message.error("上传图片失败");
      }
      this.$message.success(res1.msg);
      this.getAssectsList();
      this.$router.go(0)  //刷新页面
    },
    // 查询资产
    async searchAssect(keyword) {
      const res = await searchAssects(keyword);
      if (res.code !== 0) {
        return this.$message.error("查询失败");
      }
      this.$message.success(res.msg);
      this.assectsArr = res.data;
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