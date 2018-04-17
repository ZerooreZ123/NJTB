// 料仓余料
const chartTemplate = `
<div class="child-remain">
  <div class="chart-wrap">
    <div ref="remain"></div>
    <div style="font-size: 10px;text-align: center;height:20px;line-height:20px;overflow:hidden;">{{remain.positionname}}</div>
  </div>
</div>`
const Remain = Vue.extend({
  template: chartTemplate,
  props: ['remain', 'size'],
  mounted() {
    // 过滤 currentamount的值为负数，或者 currentamount > maxamount 的情况
    this.remain.currentamount = this.remain.currentamount >0 ? this.remain.currentamount : 0;
    this.remain.maxamount = this.remain.maxamount >this.remain.currentamount ? this.remain.maxamount : this.remain.currentamount;
    this.setChart({
      id: this.$refs.remain,
      value: this.remain.currentamount
    });
  },
  watch: {
    remain() {
      this.remain.currentamount = this.remain.currentamount >0 ? this.remain.currentamount : 0;
      this.remain.maxamount = this.remain.maxamount >this.remain.currentamount ? this.remain.maxamount : this.remain.currentamount;
      this.updateChart();
    },
    size() {
      this.updateChart();
    }
  },
  methods: {
    setChart: function (item) {
      const initChart = (el, width, height, value, frontColor) => {
        var space = value < 10 ? 15 :0;
        // const width = 50;
        // const height = 500;
        // const value = 60;
        const backgroundColor = 'rgba(34,151,255,0.5)';
        // const frontColor = 'rgb(34,151,255)';
        const lineColor = 'rgba(255,255,255,0.5)';
        const lineWidth = 1;

        const points = [
          [width / 2, height],
          [width, height - width / 2],
          [width, 0],
          [0, 0],
          [0, height - width / 2],
        ];
        const points2string = points => points.map(arr => arr.join(',')).join(' ');

        const svg = d3.select(el).append("svg").attr("width", width).attr("height", height);
        const clipPath = svg.append('defs').append('clipPath').attr('id', 'clipPath');
        clipPath.append('polygon').attr('points', points2string(points));

        const chart = svg.append('g').attr('clip-path', 'url(#clipPath)');

        const background = chart.append('rect').attr("fill", backgroundColor).attr('x', 0).attr('y', 0).attr('width', width).attr('height', height);
        const frontHeight = value / 100 * height;
        const front = chart.append('rect').attr("fill", frontColor).attr('x', 0).attr('y', height - frontHeight).attr('width', width).attr('height', frontHeight);

        const text = chart.append('text').attr('text-anchor', 'middle').attr('fill', '#fff').attr('x', width / 2).attr('dy', 5).attr('y', height - frontHeight - space).text(value + '%');

        for (let i = 1; i <= 10; i++) {
          const p = [
            [0, height / 10 * i],
            [width, height / 10 * i]
          ];
          chart.append('polyline').attr('points', points2string(p)).attr('stroke', lineColor).attr('stroke-width', lineWidth);
        }

        if (value < 10) {
          front.transition().duration(500).attr('y', height - frontHeight - space).attr('height', frontHeight + space).attr("fill", 'red');
        } else if (value>90) {
          
        }
        else {
          front.transition().duration(500).attr('y', height - frontHeight).attr('height', frontHeight).attr("fill", 'rgb(34,151,255)');
        }

        front.setValue = value => {
          const frontHeight = value / 100 * height;
          const oldValue = parseInt(text.text());
          var space = 0;
          var space_Y = 0;
          if (value < 10) {
            space = 15;
            space_Y = -10;
            front.transition().attr("fill", 'red').attr('y', height - frontHeight - space).attr('height', frontHeight + space);
          }
          else {
            space = 0;
            space_Y = 8;
            front.transition().duration(500).attr('y', height - frontHeight).attr('height', frontHeight).attr("fill", 'rgb(34,151,255)');
          }
          text.transition().duration(500).attr('y', height - frontHeight + space_Y).tween('y', () => {
            const i = d3.interpolate(oldValue, value);
            return t => text.text(i(t).toFixed(0) + '%');
          });
        }

        return front;
      }
      var value = (this.remain.currentamount / this.remain.maxamount * 100).toFixed(0);
      this.chart = initChart(item.id, this.size.width, this.size.height, value, 'rgb(34,151,255)');
    },
    updateChart: function () {
      var value = (this.remain.currentamount / this.remain.maxamount * 100);
      // console.log(value,this.remain.positionname, this.remain.currentamount,this.remain.maxamount);
      this.chart.setValue(value);
    }
  }
});