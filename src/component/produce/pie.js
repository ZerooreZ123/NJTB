const Vehicle = {
  template: '<div ref="vehicle" style="width:100%;height:100%;"></div>',
  props: ['vehicle'],
  mounted() {
    this.initChart({
      id: this.$refs.vehicle,
    });
  
  },
  destroyed() {
    this.vehicleChart.dispose();
    delete this.vehicleChart;
  },
  watch: {
    vehicle() {
      this.updateChart(this.vehicle.data)
    }
  },
  methods: {
    initChart: function (item) {
      this.vehicleChart = echarts.init(item.id);
      const option = {
        color: ['#ec883a', '#7f3bbc', '#d52c2c', '#2d8dd6', '#1abca2', '#369943', '#bbba10'],
        title: {
          x: '5%',
          y: '5%',
          textStyle: {
            color: 'white',
            fontSize: 20,
          }
        },
        legend: {
          bottom: '10',
          x: 'center',
          orient: 'horizontal',
          textStyle: {
            color: 'white',
            fontSize: 15,
          },
          formatter: '{name}',
          // data: legend
        },
        calculable: true,
        series: [{
          type: 'pie',
          radius: ['20%', '75%'],
          center: ['50%', '50%'],
          roseType: 'radius',
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{d}%',
              fontSize: 15,
            },
            emphasis: {
              show: true
            }
          },
          // data: this.vehicle.data
        }]
      };
      this.vehicleChart.setOption(option)
    },
    updateChart: function (item) {
      var legendArr = [];
      var dataArr = [];
      for (const key in item) {
        legendArr.push(key + ' ');
        dataArr.push(item[key]);
      }
     
      var data = [];
      var legend = [];
      legendArr.map((item, index) => {
        data.push({
          value: dataArr[index],
          name: item + dataArr[index]
        });
        legend.push(item + dataArr[index]);
      })

      const option = {
        title: {
          text: this.vehicle.title,
        },
        legend: {
          data: legend
        },
        series: [{
          data: data
        }]
      };
      this.vehicleChart.setOption(option)
    }
  }
}