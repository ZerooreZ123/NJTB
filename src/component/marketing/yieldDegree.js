// 产量完成率
var template = `
  <div  style="display: flex;flex: 1;position:relative;">
    <div ref="echart" style="display: flex;flex: 1;padding:10px" ></div>
    <div style="position:absolute;right:15px;display:flex;flex-direction:column;" v-html=legend></div>
  </div>`

var YieldDegree = Vue.extend({
  template: template,
  props: ['data', 'type'],
  data() {
    return {
      legend: ''
    }
  },
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
      tooltip: { trigger: 'item', formatter: "{b} : {c}", show: true },
      series:
        {
          type: 'liquidFill',
          backgroundStyle: { color: 'rgba(52, 143, 237, 0.15)' },
          color: this.getColor(),
          outline: { show: false },
          radius: '75%',
          data: [
            { value: 63.7 / 100, name: '完成' },
            { value: 36.3 / 100, name: '剩余' },
          ],
          label: {
            normal: {
              position: ['20%', '50%'],
              formatter: '                                              qwee\n\n2323',
              textStyle: { fontSize: 30 },
            },
          }
        }
    };
    myChart.setOption(option);

    this.legend = `
      <div style="display:flex;align-items: center;">
        <span style="font-size: 20px;padding-right: 5px;">`+ option.series.data[0].name + `</span>
        <div style="background:`+ option.series.color[0] + `;width:40px;height:12px;border-radius: 2.5px;"></div>
      </div>
      <div style="display:flex;align-items: center;">
        <span style="font-size: 20px;padding-right: 5px;">`+ option.series.data[1].name + `</span>
        <div style="background:`+ option.series.color[1] + `;width:40px;height:12px;border-radius: 2.5px;"></div>
      </div>`;
  },
  methods: {
    getColor() {
      var colors = ['#19a59d', '#efc95f', '#6ab4fb', '#c76ffc', '#a98bcd', '#87d169'];
      colors = colors.sort((a, b) => { return Math.random() > 0.5 ? -1 : 1 });
      return colors;
    },
  }
});

