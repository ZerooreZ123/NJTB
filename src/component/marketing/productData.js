// 当日生成数据(M³)
var template = `<div ref="echart" style="display: flex;flex: 1;margin:10px 20px 10px 0px;" ></div>`

var ProductData = Vue.extend({
  template: template,
  props: ['data'],
  mounted() {
    var myChart = echarts.init(this.$refs.echart);
    var option = {
      title: {
        text: '当日生成数据(M³)',
        textStyle: { color: 'white', fontSize: 20 },
      },
      grid: {
        left: '1%',
        right: '5%',
        top: '18%',
        bottom: '0%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
        max: 8000,
        axisLabel: { color: 'white', fontSize: 20 }
      },
      yAxis: {
        type: 'category',
        data: ['剩余方量', '完成方量', '预计方量'],
        axisLine: { show: false },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: 'white', fontSize: 20 }
      },
      series: [
        {
          type: 'bar',
          barWidth: 30,
          itemStyle:{
            normal:{
              barBorderRadius:5,
              color: function(ev){
                return ['#3b91ea','#eb9741','#eb533c'][ev.dataIndex]
              }
            }
          },
          data: [7000, 2500, 5000],
        }
      ]
    };
    myChart.setOption(option);
  },
  methods: {
  }
});

