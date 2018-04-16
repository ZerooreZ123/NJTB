// 壮壮图，替代水球图，用于展示 车辆 生产里的 生产快报模块
(function () {
  const Bar = {
    template: `
      <div  ref="producbar" style="width:100%; height:100%"></div>
    `,
    props: ['producenews', 'moreconfig'],
    data() {
      return {

      }
    },
    watch: {
      producenews() {
        this.updateChart();
      }
    },
    mounted() {
      this.initChart({
        id: this.$refs.producbar,
      });
    },
    methods: {
      initChart: function (item) {
        this.hrChart = echarts.init(item.id);
        const category = ['计划方量', '完成方量', '剩余方量'];
        const option = {
          title: {
            text: '生产快报(M³)',
            left: '0%',
            top: '0%',
            textStyle: {
              color: 'white',
              fontSize: 16,
            }
          },
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
          legend: {
            top: '2%',
            right: '10%',
            itemGap: 55,
            itemWidth: 45,
            selectedMode: false,
            data: [
              {
                name: '计划方量',
                icon: 'roundRect',
                textStyle: {
                  color: '#FFF',
                }
              }, {
                name: '完成方量',
                icon: 'roundRect',
                textStyle: {
                  color: '#FFF'
                }
              }, {
                name: '剩余方量',
                icon: 'roundRect',
                textStyle: {
                  color: '#FFF'
                }
              }
            ]
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
              },
            },
            axisLabel:{
              color:'white'
            },
            axisTick: {
              show: false
            }
          },
          series: [{
            name: '完成量',
            type: 'bar',
            barWidth: 60,
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
            itemStyle: {
              //通常情况下：
              normal: {
                //每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                color: function (params) {
                  var colorList = ['#ed883a', '#bcba10', '#379942'];
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
            data: []
          }]
        };
        this.hrChart.setOption(option)
      },
      updateChart: function () {
        var barData = [];
        barData.push(this.producenews.SumQuantity)
        barData.push(this.producenews.SumSend)
        barData.push(this.producenews.SumSend > this.producenews.SumQuantity ? 0 : this.producenews.SumQuantity - this.producenews.SumSend)
        const option = { 
          ...this.moreconfig,
          series: [{
            data: barData,
            // ...this.moreconfig.series
          }]
        };
        console.log('-------', option);
        this.hrChart.setOption(option);
      }
    },

  }
  Vue.component('common-bar', Bar);
})();
