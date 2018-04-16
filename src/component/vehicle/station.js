//车辆分站页面组件
var Station = `
<div class="station_content">
	<div class="station_title">
		<ul>
			<li>厂别</li>
			<li><img src="../../imgs/images/icon/01.png" alt=""><p>统计信息</p></li>
			<li><img src="../../imgs/images/icon/02.png" alt=""><p>生产信息</p></li>
			<li><img src="../../imgs/images/icon/03.png" alt=""><p>厂内</p></li>
			<li><img src="../../imgs/images/icon/04.png" alt=""><p>去程</p></li>
			<li><img src="../../imgs/images/icon/05.png" alt=""><p>工地</p></li>
			<li><img src="../../imgs/images/icon/06.png" alt=""><p>返程</p></li>
			<li><img src="../../imgs/images/icon/07.png" alt=""><p>未知</p></li>
			<li><img src="../../imgs/images/icon/08.png" alt=""><p>掉线</p></li>
			<li><img src="../../imgs/images/icon/11.png" alt=""><p>异常</p></li>
			<li><img src="../../imgs/images/icon/09.png" alt=""><p>闲置超时</p></li>
			<li><img src="../../imgs/images/icon/10.png" alt=""><p>间隔超时</p></li>
		</ul>
	</div>
	<div class="midWarp">
		<a href="" @click="goStationDetail(info.stationcode,info.stationname)" onclick="return false">
			<h3 >{{info.stationname}}</h3>
		</a>
		<!-- 表格 -->
		<table cellspacing="1">
			<tr>
				<th v-for="type in types">{{type}}</th>
			</tr>
			<tr>
				<td v-for="type in types">{{info.TJInfo[0][type]}}</td>
			</tr>
			<tr>
				<td v-for="type in types">{{info.TJInfo[1][type]}}</td>
			</tr>
		</table>
		<!-- 柱状图 -->
		<div class="scWarp">
			<div class="scBar" ref="supplyBar"></div>
		</div>
		<!-- 数据 -->
		<div class="itemWarp">
			<div class="item" v-for="type in types_2">
				<span class="animated fadeIn" v-for="(obj,index) in info.CarStatus" v-if="obj.CarStatus == type">
					<p>{{obj.CarID}}</p>
					<img src="../../imgs/images/01.png" v-if="obj.CarType == '泵车'"/>
					<img src="../../imgs/images/04.png" v-if="obj.CarType == '搅拌车'"/>
				</span>
			</div>
			<!-- 闲置超时 -->
			<div class="item">
				<span v-for="(obj,index) in info.pumpStatus" v-if="obj.CarStatus <= 3">
					<p>{{obj.CarID}}</p>
					<img src="../../imgs/images/01.png" v-if="obj.CarType == '泵车'"/>
					<img src="../../imgs/images/04.png" v-if="obj.CarType == '搅拌车'"/>
				</span>
			</div>
			<!-- 间隔超时 -->
			<div class="item">
				<span v-for="(obj,index) in info.pumpStatus" v-if="obj.CarStatus > 3">
					<p>{{obj.CarID}}</p>
					<img src="../../imgs/images/01.png" v-if="obj.CarType == '泵车'"/>
					<img src="../../imgs/images/04.png" v-if="obj.CarType == '搅拌车'"/>
				</span>
			</div>
		</div>
	</div>
</div>
`

var vhcStation = Vue.extend({
	template: Station,
	props: ['info'],
	data() {
		return {
			types: ['类型', '厂内', '工地', '去程', '返程', '未知', '掉线', '异常'],
			types_2: ['厂内', '工地', '去程', '返程', '未知', '掉线', '异常'],
		}
	},
	mounted() {
		this.initContent()
	},
	destroyed() {
		this.scBar.dispose();
	},
	updated() {
		this.updateContent(this.info.productInfo);
	},
	methods: {
		goStationDetail(stationcode,stationname) {
			sessionStorage.setItem('stationname', stationname);
			location.href = 'vehicle_datails.html?stationcode=' + stationcode;
		},
		initContent() {
			const supplyBar = this.$refs.supplyBar;
			this.scBar = echarts.init(supplyBar);
			this.updateContent(this.info.productInfo);
		},
		updateContent(productInfo) {
			// console.log(productInfo);
			const data = {
				SumQuantity: 0,
				SumSend: 0
			}
			if (productInfo[0]) {
				data.SumQuantity = productInfo[0].SumQuantity
				data.SumSend = productInfo[0].SumSend
			}

			let leftVal = data.SumQuantity - data.SumSend;
			if (leftVal < 0) {
				leftVal = 0;
			}
			const option = {
				color: ['#3590ed', '#ee9835', '#ed5234'],
				tooltip: {},
				grid: {
					top: '74',
					left: '123',
					containLabel: true
				},
				yAxis: [{
					type: 'category',
					data: [''],
					axisLine: {
						show: false //y轴线
					},
					axisTick: {
						show: false, //刻度线
					},
					axisLine: { //刻度颜色
						show: false
					},
				}],
				xAxis: [{
					type: 'value',
					offset: 43,
					axisLine: { //刻度颜色
						lineStyle: {
							show: false,
						}
					},
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
							fontSize: 16
						},
					},
				}],
				series: [
					{
						type: 'bar',
						data: [data.SumQuantity],
						barWidth: 21,
						barCategoryGap: '40%',
						label: {
							normal: {
								show: true,
								position: 'left',
								textStyle: { color: '#fff', fontSize: 16 },
								formatter: '预计方量',
							}
						}
					},
					{
						type: 'bar',
						data: [data.SumSend],
						barWidth: 21,
						barCategoryGap: '-100%',
						label: {
							normal: {
								show: true,
								position: 'left',
								textStyle: { color: '#fff', fontSize: 16 },
								formatter: '完成方量',
							}
						}
					}, {
						type: 'bar',
						data: [leftVal],
						barWidth: 21,
						barCategoryGap: '40%',
						label: {
							normal: {
								show: true,
								position: 'left',
								textStyle: {
									color: '#fff',
									fontSize: 16
								},
								formatter: '剩余方量',
							}
						}
					},

				]
			};

			this.scBar.setOption(option);
		}
	}
})