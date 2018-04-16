// 退转剩废的柱状图组件！！
const TuizhuanBar = {
  template: `
    <div ref="tuizhuan" style="width: 100%;height:100%;"></div>
  `,
  props: ['tuizhuaninfo'],
  mounted() {
    this.initChart({
      id: this.$refs.tuizhuan,
    });
  },
  watch: {
    tuizhuaninfo() {
      this.updateChart({});
    }
  },
  destroyed () {
    this.hrChart.dispose();
    delete this.hrChart;
  },
  methods: {
    initChart: function (item) {
      this.hrChart = echarts.init(item.id);
      const option = {
        title: {
          text: '退转剩废(M³)',
          left: '5%',
          top: '1%',
          textStyle: {
            color: 'white',
            fontSize: 16,
          }
        },
        xAxis: {
          data: ['退料', '转料', '剩料', '废料'],
          axisLine: {
            lineStyle: {
              color: '#ccc',
              width: 0
            }
          },
          axisTick: {
            show: false
          },
          axisLabel:{
            color:'white'
          }
        },
        yAxis: {
          axisLine: {
            lineStyle: {
              color: '#ccc',
              width: 0
            }
          },
          splitLine: {
            lineStyle: {
              color: '#0c2148',
              width: 1,
              type: 'solid'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel:{
            color:'white'
          }
        },
        series: [{
          name: '退转剩废(M³)',
          type: 'bar',
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: '{c}',
              textStyle: {
                color: 'white'
              }
            }
          },

          data: []
        },{
          name: '退转剩废(M³)',
          type: 'bar',
          barWidth: 20,
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: function(series){
                return  series.data + ' (' + series.name + ')'
              },
              textStyle: {
                color: 'white'
              }
            }
          },

          data: []
        }],
        itemStyle: {
          //通常情况下：
          normal: {
            //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
            color: function (params) {
              var colorList = ['#ef9242', '#c4c20d', '#3fa34b', '#db3333'];
              return colorList[params.dataIndex];
            }
          },
          //鼠标悬停时：
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
      };
      this.hrChart.setOption(option)
    },
    updateChart: function () {
      var barData = [];
      var barData1 = [];
      var category = ['退料', '转料', '剩料', '废料'];
      barData.push(this.tuizhuaninfo.data[0].Cancel)
      barData.push(this.tuizhuaninfo.data[0].Trans)
      barData.push(this.tuizhuaninfo.data[0].Remain)
      barData.push(this.tuizhuaninfo.data[0].Waste)

      barData1.push(this.tuizhuaninfo.data[1].Cancel)
      barData1.push(this.tuizhuaninfo.data[1].Trans)
      barData1.push(this.tuizhuaninfo.data[1].Remain)
      barData1.push(this.tuizhuaninfo.data[1].Waste)
      // clog(barData);
      const option = {
        series: [{
          data: barData
        },{
          data: barData1
        }]
      };
      this.hrChart.setOption(option);
    }
  }
}