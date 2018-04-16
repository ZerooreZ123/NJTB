// 产量完成率
var template = `
<div class="columnContent">
  <div style="display:flex;flex-direction: column;padding-top:32px;padding-left:22px;">
    <span style="font-size:22px;color:#fff;font-weight:1000">运载率 (%)</span>
    <div style="display:flex;flex:1;" v-html=legend></div>
  </div>
  <div style="display:flex;flex-direction:center;item-align:center;width:475pxpx;height:346px;">
    <div ref="echart" style="width:100%;height:100%" ></div>
  </div>
  
</div>`

var VehicleDegreen = Vue.extend({
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
            { value: 63.7 / 100, name: '本月' },
            { value: 36.3 / 100, name: '上月' },
          ],
          label: {
            normal: {
              position: ['20%', '50%'],
              formatter: '                              44.66%\n\n 33.58%',
              textStyle: { fontSize: 30 },
            },
          }
        }
    };
    myChart.setOption(option);

    this.legend = `
      <div style="box-sizing:border-box;display:flex;align-items: center;margin:20px 0 40px;">
        <div style="background:`+ option.series.color[0] + `;width:40px;height:14px;border-radius:20px;"></div>
        <span style="font-size: 20px;margin-right: 5px;">`+ option.series.data[0].name + `</span>
      </div>
      <div style="box-sizing:border-box;display:flex;align-items: center;margin:20px 0 40px 142px;">
        <div style="background:`+ option.series.color[1] + `;width:40px;height:14px;border-radius:20px;"></div>
        <span style="font-size: 20px;margin-right: 5px;">`+ option.series.data[1].name + `</span>
      </div>`;
  },
  methods: {
    getColor() {
      var colors = ['#42b8f7', '#1593e7'];
      colors = colors.sort((a, b) => { return Math.random() > 0.5 ? -1 : 1 });
      return colors;
    },
  }
});

