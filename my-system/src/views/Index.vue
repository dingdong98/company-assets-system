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
                <span>{{ $store.state.loginInfo.userName }}</span>
                <span>{{ $store.state.loginInfo.account }}</span>
              </div>
            </div>
          </div>
          <!-- 资产分类 -->
          <div class="classificationBox" id="classifyBox"></div>
        </div>
        <div class="rightBox">
          <div class="baseInfo">
            <div class="todayUserNumber">
              <i class="el-icon-user"></i>
              <div class="number">
                <span>{{ userList.length }}</span>
                <span>企业员工总数</span>
              </div>
            </div>
            <div class="inventory">
              <i class="el-icon-wallet" style="background-color: #67c23a"></i>
              <div class="number">
                <span>{{ totalNumber }}</span>
                <span>公司资产库存总数</span>
              </div>
            </div>
            <div class="stayStill">
              <i class="el-icon-money" style="background-color: #e6a23c"></i>
              <div class="number">
                <span>{{ totalPrice }}</span>
                <span>总价值</span>
              </div>
            </div>
          </div>
          <div class="realtimeInfoBox" id="realtimeInfoBox"></div>
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
import { getUserList, getAssectsList } from "../utils/request";
import Breadcrumb from "../components/Breadcrumb";
import * as echarts from "echarts";
import "echarts-liquidfill";
export default {
  name: "Index",
  components: { Breadcrumb },
  data() {
    return {
      breadcrumbList: ["您的位置", "系统首页"],
      userList: [],
      totalNumber: "", //资产总数
      totalPrice: "", //总价格
    };
  },
  mounted() {
    // 初始化数据调用
    this.getUserList();
    this.getAssectsList();

    // 基于准备好的dom，初始化echarts实例
    let classifyBox = echarts.init(document.getElementById("classifyBox"));
    classifyBox.setOption({
      series: [
        {
          type: "liquidFill",
          data: [0.6],
          label: {
            fontSize: 20,
          },
          backgroundStyle: {
            color: "#E3F7FF",
          },
        },
      ],
    });
  },
  methods: {
    async getUserList() {
      const res = await getUserList();
      this.userList = res.data;
    },
    async getAssectsList() {
      const res = await getAssectsList();
      const arr = res.data;
      // 获取资产总数，资产价格
      let totalNumber = null;
      let totalPrice = null;
      let assectArr = []; //饼图数据
      let nameArr = []; //资产名称
      let numberArr = []; //资产数量
      let priceArr = []; //价格总数
      // 处理数据
      arr.forEach((item) => {
        const { number, price, assectName } = item;
        totalNumber += number * price;
        totalPrice += Number(price);
        assectArr.push({ value: number, name: assectName });
        nameArr.push(assectName);
        numberArr.push(number);
        priceArr.push({ value: price, name: assectName });
      });
      console.log(priceArr);
      this.totalNumber = totalNumber;
      this.totalPrice = totalPrice;
      // 2.渲染Echarts数据---饼图
      let realtimeInfoBox = echarts.init(
        document.getElementById("realtimeInfoBox")
      );
      realtimeInfoBox.setOption({
        title: {
          text: "企业资产明细",
          textStyle: {
            color: "#001529",
            fontStyle: "oblique",
            fontFamily: "Microsoft YaHei",
          },
          subtext: "资产数量分布图",
          left: "5%",
          top: "5%",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "选中资产",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: assectArr,
          },
        ],
      });
      // 3.渲染Echarts数据--柱状图
      let lineBox = echarts.init(document.getElementById("lineBox"));
      let zoomShow = false;
      if (numberArr.length > 14) {
        zoomShow = true;
      } else {
        zoomShow = false;
      }
      lineBox.setOption({
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          top: "10%",
          right: "5%",
          left: "5%",
          bottom: "10%",
        },
        xAxis: [
          {
            type: "category",
            data: nameArr,
            axisLine: {
              lineStyle: {
                color: "rgba(66, 192, 255, .3)",
              },
            },
            axisLabel: {
              interval: 0,
              margin: 10,
              color: "#001529",
              textStyle: {
                fontSize: 11,
              },
            },
            axisTick: {
              //刻度
              show: false,
            },
          },
        ],
        yAxis: [
          {
            axisLabel: {
              padding: [3, 0, 0, 0],
              formatter: "{value}",
              color: "rgba(95, 187, 235, 1)",
              textStyle: {
                fontSize: 11,
              },
            },
            axisTick: {
              show: true,
            },
            axisLine: {
              lineStyle: {
                color: "rgba(66, 192, 255, .3)",
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,0)",
              },
            },
          },
        ],
        dataZoom: [
          //滚动条
          {
            show: zoomShow,
            type: "slider",
            realtime: true,
            startValue: 0,
            endValue: 14,
            xAxisIndex: [0],
            bottom: "10",
            left: "30",
            height: 10,
            borderColor: "rgba(0,0,0,0)",
            textStyle: {
              color: "#05D5FF",
            },
          },
        ],
        series: [
          {
            type: "bar",
            data: numberArr,
            barWidth: "10",
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "rgba(5, 213, 255, 1)", // 0% 处的颜色
                    },
                    {
                      offset: 0.98,
                      color: "rgba(5, 213, 255, 0)", // 100% 处的颜色
                    },
                  ],
                  false
                ),
                shadowColor: "#001529",
                shadowBlur: 4,
              },
            },
            label: {
              normal: {
                show: true,
                lineHeight: 10,
                formatter: "{c}",
                position: "top",
                textStyle: {
                  color: "black",
                  fontSize: 10,
                },
              },
            },
          },
        ],
      });
      // 4.渲染Echarts数据--横线图
      let barBox = echarts.init(document.getElementById("barBox"));

      var val1data2 = priceArr;

      var arrPie = ["middleLost", 0.75, val1data2, "资产单价明细"];

      barBox.setOption({
        title: {
          top: "45%",
          left: "center",
          text: arrPie[3],
          textStyle: {
            color: "#fff",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: 20,
          },
        },
        tooltip: {
          trigger: "item",
          formatter: function (res) {
            if (res.componentSubType == "liquidFill") {
              return (
                res.seriesName +
                ": " +
                ((res.value * 10000) / 100).toFixed(2) +
                "%"
              );
            } else {
              return (
                '<span class="ii" style="background:' +
                res.color +
                ' "></span>' +
                res.name +
                ":<br/> " +
                res.data.value
              );
            }
          },
        },
        series: [
          {
            type: "liquidFill",
            itemStyle: {
              normal: {
                shadowBlur: 0,
                shadowColor: "#E3F7FF",
              },
            },
            name: arrPie[3],
            data: [
              {
                value: 0.75,
                itemStyle: {
                  normal: {
                    color: "#002fa7",
                  },
                },
              },
            ],
            color: ["#002fa7"],
            center: ["50%", "50%"],
            label: {
              normal: {
                formatter: "",
                textStyle: {
                  fontSize: 12,
                },
              },
            },
            outline: {
              itemStyle: {
                borderColor: "#002fa7",
                borderWidth: 0,
              },
              borderDistance: 0,
            },
          },
          {
            type: "pie",
            radius: ["42%", "50%"],
            color: [
              "#c487ee",
              "#deb140",
              "#49dff0",
              "#034079",
              "#6f81da",
              "#00ffb4",
            ],
            hoverAnimation: false,
            label: {
              show: true,

              normal: {
                formatter: "{b}\n{d}%",
                show: true,
                position: "",
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },

            itemStyle: {
              // 此配置
              normal: {
                borderWidth: 2,
                borderColor: "#fff",
              },
              emphasis: {
                borderWidth: 0,
                shadowBlur: 2,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            data: arrPie[2],
          },
        ],
      });
    },
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
      width: 550px !important;
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
              font-size: 15px;
              color: #333;
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