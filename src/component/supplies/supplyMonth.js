// 物资月采购计划折线图组件
const SupplyMonth = Vue.extend({
  template: `<div class="sup_pie" ref = "supplyLine" style="width:100%;height:100%">{{monthinfo}}</div>`,
  props: ['monthinfo'],
  mounted() {
    this.initChart({
      id: this.$refs.supplyLine,
    })
  },
  destroyed () {
    this.myChart.dispose();
    delete this.myChart;
  },
  watch: {
    monthinfo(){
      this.updateChart();
    }
  },
  methods: {
    initChart: function (item) {
      this.myChart = echarts.init(item.id);

      const option = {
        title: {
          text: '月采购计划(吨)',
          top: '1%',
          left: '1%',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          axisLabel: {
            show: true, //刻度名称
            color: '#fff', //字体颜色
            fontSize: 14,
            rotate: -45
          },

          axisTick: {
            show: false, //刻度线
          },
          axisLine: { //刻度颜色
            lineStyle: {
              color: '#0c2454',
            }
          },
        }],
        // legend: {
        //   data: ['进', '销', '存'],
        //   icon: 'rect',
        //   top: 10,
        //   right: 130,
        //   itemWidth: 31,
        //   itemHeight: 10,
        //   textStyle: {
        //     color: '#fff'
        //   }
        // },
        yAxis: [{
          type: 'value',
          offset: 10,
          min: 0,
          splitLine: {
            show: true, //背景网格
            lineStyle: {
              color: '#0c2454'
            }
          },
          height: 50,
          axisLine: {
            show: false //y轴线
          },
          axisTick: {
            show: false, //刻度线
          },
          lineHeight: 34,
          axisLabel: {
            textStyle: {
              color: '#fff', //y轴字体颜色
              fontSize: 16
            },
          },
        }
        ],
        series: [
          {
            name: '月采购计划',
            type: 'line',
            barWidth: 60,
            // data: this.monthinfo.jin,
            symbolSize: 14,
            itemStyle: {
              normal: {
                color: '#a1b752'
              }
            },
            label: {
              normal: {
                show: false, //显示字体
              },
            },
          }
         
        ]
      };

      this.myChart.setOption(option);
    },
    updateChart: function () {
      const option = {
        xAxis: [{
          data: this.monthinfo.name,
        }],
        series: [
          {
            data: this.monthinfo.lineData
          }
        ]
      };
      this.myChart.setOption(option);

    }
  }
})