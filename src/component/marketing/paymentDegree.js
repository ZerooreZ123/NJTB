// 回款完成率
var template = `
  <div  style="display: flex;flex: 1;position:relative;">
    <div ref="echart" style="display: flex;flex: 1;padding:10px" ></div>
  </div>`

var PaymentDegree = Vue.extend({
  template: template,
  props: ['data'],
  mounted() {
    var data = this.data ? this.data : {};
    var myChart = echarts.init(this.$refs.echart);
    var option = {
      title: {
        text: data.title,
        x: 'center',
        y: 'bottom',
        textStyle: { color: 'white', fontSize: 25 },
      },
      legend: {
        x: 'right',
        y: 'top',
        orient: 'vertical',
        itemWidth: 40,
        itemHeight: 12,
        textStyle: { color: 'white', fontSize: 20, fontFamily: 'Microsoft YaHei' },
        data: ['已收', '未收'],
      },
      tooltip: { trigger: 'item', formatter: "{b} : {c}", show: true },
      series:
        {
          type: 'pie',
          color: this.getColor(),
          center: ['50%', '50%'],
          roseType: 'radius',
          label: {
            normal: {
              formatter: '{c}',
              position: 'inner',
              textStyle: { fontSize: 30 },
            }
          },
          data: [
            { value: 36.3, name: '已收' },
            { value: 63.7, name: '未收' },
          ]
        }
    };
    myChart.setOption(option);
  },
  methods: {
    getColor() {
      var colors = ['#19a59d', '#efc95f', '#6ab4fb', '#c76ffc', '#a98bcd', '#87d169'];
      colors = colors.sort((a, b) => { return Math.random() > 0.5 ? -1 : 1 });
      return colors;
    },
  }
});

