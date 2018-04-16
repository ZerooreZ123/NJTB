// 分站等级产量组件！！
const dengjiBar = {
  template: `
    <div ref="produc" style="width:940px;height:460px;"></div>
  `,
  props: ['produceinfo'],
  mounted() {
    this.initChart({
      id: this.$refs.produc,
    });
  },
  watch: {
    produceinfo() {
      this.updateChart()
    }
  },
  destroyed () {
    this.hrChart.dispose();
  },
  methods: {
    initChart: function (item) {
      this.hrChart = echarts.init(item.id);
      const option = {
        title: {
          left: '3%',
          top: '2%',
          textStyle: {
            color: 'white',
            fontSize: 16,
          }
        },
        legend: {
          top: '2%',
          right: '10%',
          itemGap: 55,
          itemWidth: 45,
          selectedMode: false,
          data: [
            {
              name: '剩余量',
              icon: 'roundRect',
              textStyle: {
                color: '#FFF',
              }
            }, {
              name: '完成量',
              icon: 'roundRect',
              textStyle: {
                color: '#FFF'
              }
            }
          ]
        },
        xAxis: {
          data: [],
          axisLine: {
            lineStyle: {
              color: '#ccc',
              width: 0
            }
          },
          axisTick: {
            show: false
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
          }
        },
        series: [{
          name: '完成量',
          type: 'bar',
          barWidth: 30,
          barCategoryGap: '40%',
          stack: 'stack',
          label: {
            normal: {
              show: true,
              // position: 'insideTop',
              offset:[0,-5],
              formatter: '完成{c}',
              textStyle: {
                color: 'white'
              }
            }
          },
          itemStyle: {
            normal: {
              barBorderRadius: 5,
              color: '#2c85ea'
            }
          },
          // data: barData
        }, {
          name: '剩余量',
          type: 'bar',
          // barGap: '-100%',
          barWidth: 30,
          barCategoryGap: '40%',
          stack: 'stack',
          label: {
            normal: {
              show: true,
              // position: 'top',
              offset:[0,-15],
              formatter: '剩余{c}',
              textStyle: {
                color: 'white'
              }
            }
          },
          itemStyle: {
            normal: {
              barBorderRadius: 5,
              color: '#edb234'
            }
          },
          // data: bgData
        }]
      };
      this.hrChart.setOption(option)
    },
    updateChart: function () {
      const barData = [];
      const bgData = [];
      const category = [];
      this.produceinfo.data.forEach((value, index) => {
        category.push(value.type);
        barData.push(value.complete.toFixed(0));
        // console.log(value.complete,value.NOTcomplete);
        const remain = value.complete > value.planNum ? 0 : value.NOTcomplete
        bgData.push(remain.toFixed(0));
      })
      
      const option = {
        title: {
          text: this.produceinfo.title,
        },
        xAxis: {
          data: category,
          axisLine: {
            lineStyle: {
              color: '#ccc',
              width: 0
            }
          },
          axisTick: {
            show: false
          }
        },
        series: [{
          data: barData
        }, {
          data: bgData
        }]
      };
      this.hrChart.setOption(option);
    }
  }
}