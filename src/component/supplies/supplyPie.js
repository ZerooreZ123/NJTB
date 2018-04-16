// 物资采购饼图组件组件

const SupplyPie = Vue.extend({
  template: `<div ref="supplyPie" style="width:100%;height:100%"></div>`,
  props: ['yearinfo'],
  mounted() {
    this.initChart({
      id: this.$refs.supplyPie,
    })
  },
  watch: {
    yearinfo() {
      this.updateChart();
    }
  },
  methods: {
    initChart: function (item) {
      this.supplyChart = echarts.init(item.id);
     const option = {
        title: {
          text: '年采购计划(吨)',
          top: '1%',
          left: '1%',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}{c}'
        },
        legend: {
          x: 'center',
          y: 'bottom'
        },
        calculable: true,
        series: [
          {
            color: ['#fe8eae', '#fea1cc', '#fca8e1', '#de9cfd', '#d0a8fc', '#fcba61', '#f5d978', '#f5ed78', '#c8f578', '#9df174', '#6fea8e', '#78f597', '#65db99', '#78f5af', '#7bebc3', '#78f5d7', '#78f4f5', '#78d6f5', '#78bff5'],
            type: 'pie',
            radius: [50, 160],
            center: ['50%', '50%'],
            roseType: 'radius',
            label: {   //图形字体颜色
              normal: {
                // borderWidth:1,
                // borderColor:'pink',

                textStyle: {
                  color: '#fff',
                }
              }
            },
            labelLine: {  //线颜色
              normal: {
                lineStyle: {
                  color: '#8783a4'
                },
                smooth: 0.2,
                length: 10,
                length2: 20
              }
            },
            // data: this.yearinfo.data
          }
        ]
      }
      this.supplyChart.setOption(option);
    },
    updateChart: function () {
      var option = {
        series: [
          {
            data: this.yearinfo.data
          }
        ]
      };
      this.supplyChart.setOption(option)
    }

  }
})
