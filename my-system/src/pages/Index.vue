<template>
  <div class="indexContainer">
    <!-- 面包屑 -->
    <Breadcrumb :breadcrumbList="breadcrumbList"></Breadcrumb>
    <div class="infoBox">
      <div class="topBox">
        <div class="leftBox">
          <!-- 用户信息 -->
          <div class="userInfoBox">
            <div class="userInfo">
              <img src="../assets/imgs/avatar.jpeg" alt="" srcset="" />
              <div class="userName">
                <span>叮咚</span>
                <span>超级管理员</span>
              </div>
            </div>
          </div>
          <!-- 最受欢迎的分类书籍 -->
          <div class="classificationBox">
            <span class="classificationTitle">资产库存最多Top3</span>
            <div class="progressBox">
              <span>电子产品</span>
              <el-progress :percentage="80"></el-progress>
            </div>
            <div class="progressBox">
              <span>固定资产</span>
              <el-progress :percentage="90" color="#f56c6c"></el-progress>
            </div>
            <div class="progressBox">
              <span>IT设备</span>
              <el-progress :percentage="50" color="#e6a23c"></el-progress>
            </div>
          </div>
        </div>
        <div class="rightBox">
          <div class="baseInfo">
            <div class="todayUserNumber">
              <i class="el-icon-user"></i>
              <div class="number">
                <span>3</span>
                <span>今日用户量</span>
              </div>
            </div>
            <div class="inventory">
              <i class="el-icon-box" style="background-color: #67c23a"></i>
              <div class="number">
                <span>3584</span>
                <span>当前资产库存</span>
              </div>
            </div>
            <div class="stayStill">
              <i class="el-icon-reading" style="background-color: #e6a23c"></i>
              <div class="number">
                <span>35</span>
                <span>待审核</span>
              </div>
            </div>
          </div>
          <div class="realtimeInfoBox">
            <span>实时资产借阅信息</span>
            <div class="realtimeInfo">
              <span v-for="(i, index) in 10" :key="index">
                普通用户借阅电子信息产品数量*10
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="footerBox">
        <div id="barBox"></div>
        <div id="lineBox"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "../components/Breadcrumb";
import * as echarts from "echarts";
export default {
  name: "Index",
  components: { Breadcrumb },
  data() {
    return {
      breadcrumbList: ["您的位置", "系统首页"],
    };
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var barBox = echarts.init(document.getElementById("barBox"));
    var lineBox = echarts.init(document.getElementById("lineBox"));
    // 绘制图表
    barBox.setOption({
      title: {
        text: "最近一周资产总数",
        textStyle: {
          color: "#333",
          fontWeight: "400",
          fontSize: 20,
        },
        left: "center",
        top: 20,
      },
      legend: {
        top: 60,
      },
      tooltip: {},
      grid: {
        top: 100,
        bottom: 40,
      },
      xAxis: {
        data: ["4-22", "4-23", "4-24", "4-25", "4-26", "4-27", "4-28"],
      },
      yAxis: {},
      series: [
        {
          name: "电子产品",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20, 35],
        },
        {
          name: "固定资产",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20, 27],
        },
        {
          name: "IT资产",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20, 30],
        },
      ],
    });
    lineBox.setOption({
      title: {
        text: "最近半年设备借阅归还走势图",
        textStyle: {
          color: "#333",
          fontWeight: "400",
          fontSize: 20,
        },
        left: "center",
        top: 20,
      },
      legend: {
        top: 60,
      },
      tooltip: {},
      grid: {
        top: 100,
        bottom: 40,
      },
      xAxis: {
        data: ["2022-1", "2022-2", "2022-3", "2022-4", "2022-5", "2022-6"],
      },
      yAxis: {},
      series: [
        {
          name: "借阅",
          type: "line",
          data: [20, 36, 10, 10, 20, 35],
        },
        {
          name: "归还",
          type: "line",
          data: [5, 20, 3, 15, 32, 27],
        },
      ],
    });
  },
};
</script>

<style lang="less" scoped>
.indexContainer {
  width: 100%;
}
.infoBox {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  .topBox {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .leftBox {
      width: 400px !important;
      .userInfoBox,
      .classificationBox {
        width: 100%;
        border-radius: 5px;
        padding: 20px;
        box-sizing: border-box;
        background-color: #fff;
      }
      .userInfoBox {
        height: 240px;
        .userInfo {
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 2px solid #ccc;
          padding-bottom: 20px;
          box-sizing: border-box;
          img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
          }
          .userName {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 30px;
            text-align: left;
            span:first-child {
              font-size: 24px;
            }
            span:last-child {
              font-size: 12px;
              color: #666;
            }
          }
        }
      }
      .classificationBox {
        margin-top: 20px;
        height: 280px;
        display: flex;
        flex-direction: column;
        .classificationTitle {
          font-size: 20px;
          padding-bottom: 10px;
          box-sizing: border-box;
          border-bottom: 1px solid #ccc;
          margin-bottom: 20px;
        }
        .progressBox {
          margin-bottom: 10px;
          span {
            font-size: 13px;
            color: #333;
          }
        }
      }
    }
    .rightBox {
      width: 901px;
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      .baseInfo {
        display: flex;
        justify-content: space-between;
        div {
          width: 270px;
          height: 120px;
          flex: 1;
          background-color: #fff;
          border-radius: 5px;
        }
        .todayUserNumber,
        .inventory,
        .stayStill {
          display: flex;
          i {
            font-size: 50px;
            width: 120px;
            height: 120px;
            background-color: #409eff;
            line-height: 120px;
            text-align: center;
            color: #fff;
            border-radius: 5px 0 0 5px;
          }
          .number {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            span:first-child {
              font-size: 20px;
              font-weight: 600;
              color: #409eff;
            }
            span:last-child {
              font-size: 13px;
              color: #666;
              margin-top: 10px;
            }
          }
        }
        .inventory {
          margin: 0 20px;
        }
      }
      .realtimeInfoBox {
        width: 100%;
        height: 400px;
        background-color: #fff;
        border-radius: 5px;
        margin-top: 20px;

        > span {
          font-size: 20px;
          display: block;
          padding-bottom: 20px;
          border-bottom: 1px solid #ccc;
          padding: 20px;
          box-sizing: border-box;
        }
        .realtimeInfo {
          width: 100%;
          height: 306px;
          overflow: auto;
          display: flex;
          flex-direction: column;
          padding: 20px;
          box-sizing: border-box;
          span {
            width: 100%;
            height: 60px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            // overflow: hidden;
            padding: 10px 0;
            border-bottom: 1px solid #ccc;
            font-size: 13px;
            line-height: 20px;
          }
        }
      }
    }
  }

  .footerBox {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 400px;
    margin: 20px 0 60px 0;
    #barBox,
    #lineBox {
      width: 49%;
      height: 100%;
      background-color: #fff;
      border-radius: 5px;
    }
  }
}
</style>