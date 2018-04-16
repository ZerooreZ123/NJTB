// 物资进销存折线图组件
const templatePie = `
  <div class="sup_pie" ref = "supplyLine" style="width:100%;height:100%">{{instoreinfo}}</div>
`
const SupplyLine = Vue.extend({
  template: templatePie,
  props: ['instoreinfo'],
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
    instoreinfo(){
      this.updateChart();
    }
  },
  methods: {
    initChart: function (item) {
      this.myChart = echarts.init(item.id);

      const option = {
        title: {
          text: '原材料进销存(吨)',
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
        legend: {
          data: ['进', '销', '存'],
          icon: 'rect',
          top: 10,
          right: 130,
          itemWidth: 31,
          itemHeight: 10,
          textStyle: {
            color: '#fff'
          }
        },
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
            name: '进',
            type: 'line',
            barWidth: 60,
            data: this.instoreinfo.jin,
            symbolSize: 14,
            itemStyle: {
              normal: {
                color: '#3691ee'
              }
            },
            label: {
              normal: {
                show: false, //显示字体
              },
            },
          },
          {
            name: '销',
            type: 'line',
            barWidth: 60,
            data: this.instoreinfo.xiao,
            barCategoryGap: '20%',
            symbolSize: 14,
            itemStyle: {
              normal: {
                color: '#fd7e1f'
              }
            },
            label: {
              normal: {
                show: false, //显示字体
              },
            },
          },
          {
            name: '存',
            type: 'line',
            barWidth: 60,
            data: this.instoreinfo.cun,
            barCategoryGap: '20%',
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
          data: this.instoreinfo.name,
          
        }],
        series: [
          {
            name: '进',
            type: 'line',
            data: this.instoreinfo.jin
          },
          {
            name: '销',
            type: 'line',
            data: this.instoreinfo.xiao
          },
          {
            name: '存',
            type: 'line',
            data: this.instoreinfo.cun
          },
        ]
      };
      this.myChart.setOption(option);

    }
  }
})