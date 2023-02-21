<template>
  <div class="home">
    <!--1.  顶部区域布局---------- -->
    <div class="header">
      <div class="item">
        总销售额
        <div class="num">{{ totalData.saleTotal | num }}</div>
        <div class="bottom">今日销售额：{{ totalData.sale | num }}</div>
      </div>
      <div class="item">
        总访问量
        <div class="num">{{ totalData.viewsTotal | num }}</div>
        <div class="bottom">今日访问量：{{ totalData.views | num }}</div>
      </div>
      <div class="item">
        总收藏量
        <div class="num">{{ totalData.collectTotal | num }}</div>
        <div class="bottom">今日销售额：{{ totalData.collect | num }}</div>
      </div>
      <div class="item">
        总支付量
        <div class="num">{{ totalData.payTotal | num }}</div>
        <div class="bottom">今日支付量：{{ totalData.pay | num }}</div>
      </div>
    </div>

    <!--2. 访问数据统计 ----------------->
    <div class="content">
      <div class="time-info" id="box13">
        <div id="charts" style="width: 100%; height: 300px"></div>
      </div>
      <div class="area" id="box1">
        <div class="title">产品销售比例</div>
        <div id="pie" style="width: 100%; height: 300px"></div>
      </div>
    </div>

    <!-- 3.  -->
    <!-- 最新内容 -->
    <div class="home-footer">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>今日订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">今日订单数</div>
              <div>{{ orderData.curOrderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.curCollect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">今日金额</div>
              <div>{{ orderData.curMoney }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>本月订单</span>
        </div>
        <div class="text item">
          <el-row>
            <el-col :span="8">
              <div class="title">本月订单数</div>
              <div>{{ orderData.orderCount }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">汇总确认订单</div>
              <div>{{ orderData.collect }}</div>
            </el-col>
            <el-col :span="8">
              <div class="title">累计金额</div>
              <div>{{ orderData.money }}</div>
            </el-col>
          </el-row>
        </div>
      </el-card>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>快捷入口</span>
        </div>
        <div class="text item">
          <el-button type="primary">产品管理</el-button>
          <el-button>消息管理</el-button>
          <el-button>内容管理</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      totalData: {}, //首页数据统计
      orderData: {},
    };
  },
  created() {
    this.totalInfo();
    this.orderInfo();
    this.format();
  },
  mounted() {
    //最早获取DOM元素的生命周期函数  挂载完毕
    // this.pie();
    // 静态需要，动态不需要了
  },
  methods: {
    async totalInfo() {
      let res = await this.$api.totalInfo();
      console.log("统计信息---", res.data.data.list);
      this.totalData = res.data.data.list;
    },
    // 获取今日订单数据
    async orderInfo() {
      let res = await this.$api.orderInfo();
      console.log("获取今日订单统计数据", res.data);
      this.orderData = res.data.list;
    },
    // 获取图表动态数据
    async format() {
      let res = await this.$api.format();
      console.log("图表动态数据", res.data);
      // 折线图 柱状图数据格式:[xx,xx,xx]
      // 获取x轴数据名称
      let arr = res.data.result.data.sale_money;
      let arrx = [],
        money = [],
        total = [],
        pieData = [];
      arr.forEach((ele) => {
        arrx.push(ele.name);
        total.push(ele.num);
        money.push(ele.total_amount);

        // 饼图---对象数据
        let obj = {};
        obj.name = ele.name;
        obj.value = ele.total_amount;
        pieData.push(obj);
      });
      this.line(arrx, money, total);
      this.pie(pieData);
    },

    // 绘制图表 --- 折线
    line(data, money, total) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("charts"));
      console.log(data);
      // 绘制图表
      myChart.setOption({
        tooltip: {
          //默认提示框组件
          trigger: "axis",
        },
        legend: {},
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          data,
        },
        yAxis: {
          //y轴会自动创建数据
        },
        series: [
          //图表内容
          {
            name: "销售额",
            type: "line", //bar 柱状图 line 折线图 pei饼图 map地图
            data: money,
            label: {
              //图形上的文本标签
              show: true,
            },
            smooth: true, //平滑曲线
          },
          {
            name: "销售量",
            type: "bar",
            data: total,
          },
        ],
      });
    },

    // 绘制饼图
    pie(pieData) {
      var myChart = echarts.init(document.getElementById("pie"));
      var option;
      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a}<br>{b}-{d}%",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "产品销售",
            type: "pie",
            radius: "50%",
            data: pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };

      option && myChart.setOption(option);
    },
  },

  filters: {
    num(value) {
      if (!value) return;
      return value.toLocaleString();
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  margin: 10px;
}
.header {
  display: flex;
  padding-right: 30px;
  .item {
    flex: 1;
    height: 100px;
    padding: 10px;
    background: #fff;
    border-radius: 10px;
    margin-left: 20px;
    margin-right: 20px;
    font-weight: bold;
    color: #fff;
    // text-align: center;
    position: relative;
    .num {
      font-size: 22px;
      margin: 10px;
      color: #fff;
    }
    .bottom {
      position: absolute;
      border-top: 1px solid rgb(246, 245, 245);
      padding: 10px 20px;
      bottom: 0;
      right: 0;
      left: 0;
      color: #fff;
      font-weight: normal;
    }
  }
  .item:nth-child(1) {
    background-image: linear-gradient(#df887d, #88554d);
  }
  .item:nth-child(2) {
    background-image: linear-gradient(#409eff, #2e556e);
  }
  .item:nth-child(3) {
    background-image: linear-gradient(#b54fa8, #713c7a);
  }
  .item:nth-child(4) {
    background-image: linear-gradient(#1cd2f1, #39717a);
  }
}

// 图表

.content {
  margin: 20px;
  display: flex;
  height: 320px;
  .time-info {
    flex: 2;
    background: #fff;
    margin-right: 20px;
    padding: 10px;
  }
  .area {
    flex: 1;
    background: #fff;
    padding: 10px;
  }
}

//内容

.home-footer {
  display: flex;
  padding-left: 20px;
  margin-bottom: 20px;
  .box-card {
    flex: 1;
    margin-right: 30px;
    span {
      font-weight: 600;
    }
  }
}
</style>