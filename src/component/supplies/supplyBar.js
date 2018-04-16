// 物资实时库存柱状图组件

const SupplyBar = Vue.extend({
	template: `<div ref="topBar" style="width:100%;height:100%">{{realtimeinfo}}</div>`,  //组件
	props: ['realtimeinfo', 'pie'], //传值
	mounted() {  //所有页面元素都加载到页面后执行
		this.initChart({
			id: this.$refs.topBar,
		})

	},
	updated() {   //有数据更新时触发执行
		this.updateChart();
	},
	methods: { //方法
		initChart: function (item) {
			this.BarChart = echarts.init(item.id);
			option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				title: {
          text: '实时库存(吨)',
          top: '1%',
          left: '1%',
          textStyle: {
            color: '#fff'
          }
        },
				grid: {
					left: '3%',
					right: '4%',
					bottom: '5%',
					containLabel: true
				},
				tooltip: {
					trigger: 'item',
					formatter: "{b}: {c}"
				},
				xAxis: [{
					type: 'category',
					axisLabel: {
						show: true, //刻度名称
						color: '#fff', //字体颜色
						fontSize: 14,
						interval: 0,
						rotate: -45

					},

					axisTick: {
						show: false, //刻度线
					},
					axisLine: { //刻度颜色
						lineStyle: {
							color: '#0c2454',

						}
					},
				}],

				yAxis: [{
					type: 'value',
					offset: 10,
					min: 0,
					splitLine: {
						show: false //背景网格
					},
					height: 50,
					axisLine: {
						show: false //y轴线
					},
					axisTick: {
						show: false, //刻度线
					},
					lineHeight: 34,
					axisLabel: {
						textStyle: {
							color: '#fff', //y轴字体颜色
							fontSize: 12
						},

					},
				},],
				series: [

					{
						name: '实时库存(吨)',
						type: 'bar',
						zlevel: -1,
						barWidth: 16,

						// data: this.realtimeinfo.data,
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1, [
										{ offset: 0.3, color: 'rgb(51, 132, 250)' },
										{ offset: 0.7, color: 'rgb(2, 103, 253)' }
									]
								)
							}
						},
						label: {
							normal: {
								show: false, //显示字体
							},

						},
					},
					{
						name: '半径模式',
						type: 'pie',
						zlevel: 999,
						radius: [0, 110],
						center: ['80%', '25%'],
						color: ['#6e0000', '#a85600', '#8f09c8', '#c4d817', '#49f062', '#5831b1'],
						// roseType: 'radius',
						label: {
							normal: {
								show: true,
								position: 'inner',
								color: '#fff',
								fontSize: 14,
								formatter: "{b}\n{d}%",
							}
						},

						// data: this.realtimeinfo.pie,

					}
				]
			};

			this.BarChart.setOption(option);


		},
		updateChart() {
			const option = {
				xAxis: [{
					type: 'category',
					data: this.realtimeinfo.nameData,
				}],
				series: [{
					type: 'bar',
					data: this.realtimeinfo.data
				}, {
					type: 'pie', data: this.realtimeinfo.pie
				}]
			};
			this.BarChart.setOption(option);
		}
	}

})