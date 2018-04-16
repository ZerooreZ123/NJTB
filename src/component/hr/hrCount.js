// 产量完成率
var template = `
<div class="columnContent block-bg" style="padding:35px;">
  <div style="display:flex;flex:1.5;flex-direction: column;">
    <span style="font-size: 20px;color: white;">人力资源 (人)</span>
    <div style="display:flex;flex:1;" v-html=legend></div>
  </div>
  <div ref="echart" style="display: flex;flex: 2;" ></div>
  <div style="display: flex;flex: 1.5;flex-direction: column;align-items: center;justify-content:center;" >
    <div>
      <span style="color:white;font-size:20px;">总人数<span>
      <span style="color:rgba(247,208,55,1);font-size:75px;">2000<span>
    </div>
    <div style="color:white;font-size:20px;">
      打卡人数
      <span style="color:rgba(247,208,55,1);">1100</span>人,未打卡人数
      <span style="color:rgba(247,208,55,1);">900</span>人
    </div>
  </div>
</div>`

var HRCount = Vue.extend({
  template: template,
  props: ['data'],
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
          radius: '100%',
          data: [
            { value: 63.7 / 100, name: '打卡人数' },
            { value: 36.3 / 100, name: '未打卡人数' },
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
      <div style="display:flex;flex:1;align-items: center;justify-content:center;">
        <span style="font-size: 20px;margin-right: 5px;">`+ option.series.data[0].name + `</span>
        <div style="background:`+ option.series.color[0] + `;width:40px;height:12px;border-radius: 2.5px;"></div>
      </div>
      <div style="display:flex;flex:1;align-items: center;justify-content:center;">
        <span style="font-size: 20px;margin-right: 5px;">`+ option.series.data[1].name + `</span>
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

