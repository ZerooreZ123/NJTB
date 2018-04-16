
var maps = {
  template: `
  <div style="display:flex;justify-content:space-around">
    <div id="map" style="width:1516px"></div>
    <div class="stats_s news_tab">
      <div class="s_search">
        <p>车号:</p>
        <input type="text" v-model="keyword" style="margin-top:0;"/>
        <!--  <span style="margin-top:0;">查询</span>  -->
      </div>
      <table style="width:96%;margin-left:2px">
        <tr >
          <th style="width:107px;">车号</th>
          <th style="width:107px;">滚筒</th>
          <th style="width:105px;padding-right:3px;">时速</th>
          <th style="width:107px;">状态</th>
        </tr>
      </table>
      <div class="tables">
        <table>
          <div v-for="vehicle in filterList">
            <div style="width:100%">{{vehicle.stationname}}</div>
              <tr v-for="obj in vehicle.signalList" @click="setMarkerCenter(obj)">
                <td :style="{color: obj.onlinestatus == '离线' ? 'gray' : 'white' }">{{obj.carid}}</td>
                <td :style="{color: obj.onlinestatus == '离线' ? 'gray' : 'white' }">{{obj.cartype== '泵车' ? '泵车' : obj.isremove=='1' ? '卸料' : obj.ismixing=='1' ? '搅拌' : '停转'}}</td>
                <td :style="{color: obj.onlinestatus == '离线' ? 'gray' : 'white' }">{{obj.speed? (parseInt(obj.speed)).toFixed(0) : 0}}</td>
                <td :style="{color: obj.onlinestatus == '离线' ? 'gray' : 'white' }">{{obj.workstatus == '未知' ? '厂外' : obj.workstatus}}</td>
              </tr>
            </div>
          </div>
        </table>
      </div>
    </div>
  </div>
  `,
  props: ['project', 'vehicle','catlist'],
  data: function () {
    return {
      keyword: ""
    }
  },
  computed: {
    filterList() {
      const keyword = this.keyword;
      const tempResult = [];
      for (let i=0;i<this.catlist.length;i++) {
        const stationItem =  this.catlist[i];
        const temp = [];
        // 遍历每个站点下所有车辆是否包含输入框内容，如果包含 放到临时数组，在下面按接口返回的类型重组数据，然后返回
        stationItem.signalList.forEach((item,index)=>{
          if (item.carid.indexOf(keyword)>-1) {
            temp.push(item)
          }
        })
        // 按接口返回的类型重组数据，然后返回
        tempResult.push(temp.length>0?{
          stationname:stationItem.stationname,
          signalList:temp
        } : [])
      }
      return tempResult;
    }
  },
  mounted() {
    this.creatMap();
    // this.addProjects(this.project);   //添加工程地标注
    // this.addVehicleMarker(this.vehicle);  //添加车辆标注
  },
  updated(){
    // console.log(this.catlist);
    const markerData = []
    this.filterList.forEach(item=>{
      if (item.signalList) {
        item.signalList.forEach((item,index)=>{
          markerData.push(item)
        })
      }
     
    })
    this.addVehicleMarker(markerData);  //添加车辆标注
    this.addProjects(markerData);   //添加工程地标注
  },
  methods: {
    creatMap: function () {
      this.map = new AMap.Map('map', {
        // layers: [new AMap.TileLayer.RoadNet(), new AMap.TileLayer.Traffic()],
        zoom: 10
      });
      AMapUI.setDomLibrary($);
      //加载BasicControl，loadUI的路径参数为模块名中 'ui/' 之后的部分
      AMapUI.loadUI(['control/BasicControl'], (BasicControl) => {
        //图层切换控件
        this.map.addControl(new BasicControl.LayerSwitcher({
          position: 'rt' //right top，右上角
        }));
      });
    },
    addProjects: function(markers) {
      let projectArr = [];
      markers.forEach(item => {
        if (item.centerLng || item.centerLat) {
          projectArr.push(item);
        }
      });
      projectArr.forEach((item,index) => {
        const glcLonLat = GPS.gcj_encrypt(Number(item.latitude), Number(item.longitude));
        // [glcLonLat.lon, glcLonLat.lat]
        const projectId = 'markerproject' + index
        const marker = new AMap.Marker({
          map: this.map,
          content: `
            <div class="">
              <img style="width: 20px;" class="marker-flag" src="../../imgs/common/workMarks.png">
            </div>
          `,
          position: [glcLonLat.lon, glcLonLat.lat],
          autoRotation: true,
          // clickable: true,
          topWhenClick: true,
          topWhenMouseOver: true
        });
       
        // 鼠标移动到地标上面显示工程详情(新建和移除临时marker)
        let projectMarker = null;
        AMap.event.addListener(marker, "mouseover", e => {
          projectMarker = new AMap.Marker({
            map: this.map,
            content: `
              <div id = ${projectId} class="marker-title marker-project">${item.projectname}</div>
            `,
            position: [glcLonLat.lon, glcLonLat.lat],
            offset: new AMap.Pixel(0, -50), 
          });
        });
        AMap.event.addListener(marker, "mouseout", e => {
          projectMarker.setMap(null);
        });
      });
    },
    addVehicleMarker: function (markers) {
      let vehicleArr = [];
      markers.forEach(item=>{
        if (item.longitude||item.latitude) {
          vehicleArr.push(item);
        }
      })
      vehicleArr.forEach(item => {
        // 对应车辆状态的marker
        const img_url = item.onlinestatus=== "离线" ? '../../imgs/common/offLine.png' : 
          item.cartype === "搅拌车" ? '../../imgs/common/jiaoban.png' : '../../imgs/common/bengche.png';
        const glcLonLat = GPS.gcj_encrypt(Number(item.latitude), Number(item.longitude));
        const bg_color = item.color? item.color : '#FFF';
        const marker = new AMap.Marker({
          map: this.map,
          content: `<div class="marker-vehicle" style = "position:relative;width: 90px;">
            <div style="position: absolute;left:22px;bottom:0;background:${bg_color};display: flex;align-items: center;margin-bottom: 2px;flex-direction: column;border:1px solid black;height:item.exceptionName?40px:20px;">
              <span style="font-size:12px;padding:0;color:black;margin-top: -2px;">${item.carid}</span>
              <div style="color:black;font-size:12px;margin-top: -3px;">${item.exceptionName? item.exceptionName:''}</div>
            </div>
            <img src=${img_url} style="transform: rotate(${item.angle}deg);position:absolute;left:2px;bottom:0;">
          </div>`,
          position: [glcLonLat.lon, glcLonLat.lat],
          autoRotation: true,
          // clickable: true,
          topWhenClick: true,
          topWhenMouseOver: true,
        });
       
        marker.setExtData({ markerInfo: item })
        AMap.event.addListener(marker, 'click', (e) => {
          // 在点击点标注的时候把点传过去，在点击回调的方法里面设置点击点标注时的动画效果
          this.markerClick(e, marker);
        });
        AMap.event.addListener(this.map, 'click', ()=>{
          if (this.infoWindow) {
            this.infoWindow.close()
          }
        });
      });
      
    },
    markerClick: function (e, marker) {
      const markerInfo = marker.getExtData().markerInfo;
      // console.log(marker.getContent());
      // 在这里设置点击点标注时的动画效果
      // marker.setAnimation('AMAP_ANIMATION_DROP');
      this.openInfo(markerInfo);
    },
    setMarkerCenter: function(marker){
      const glcLonLat = GPS.gcj_encrypt(Number(marker.latitude), Number(marker.longitude));
      // [glcLonLat.lon, glcLonLat.lat]
      this.map.setZoomAndCenter(16, [glcLonLat.lon, glcLonLat.lat]);
    },
    openInfo(marker) {
      const glcLonLat = GPS.gcj_encrypt(Number(marker.latitude), Number(marker.longitude));
      // [glcLonLat.lon, glcLonLat.lat]
      //构建信息窗体中显示的内容
      let htmlStr = '';
      // 之前是判断 marker.shipid
      if (marker['shipid']) {
        var gtState = '';
        if (marker.isremove==="1") {
          gtState = '卸料'
        }else if (marker.ismixing==="1") {
          gtState = '搅拌'
        }else{
          gtState = '停转'
        }
        htmlStr = `
        <table class = "info-window" >
          <tr class = "info-logo">
            <td><img style="width:60px;height:17px;" src="../../imgs/common/cucc.png" alt=""></td>
          </tr>
          <tr>
            <td>车号</td>
            <td>${marker.carid}</td>
          </tr>
          <tr>
            <td>定位时间</td>
            <td>${marker.gpsdatetime}</td>
          </tr>
          <tr>
            <td>速度</td>
            <td>${marker.speed}</td>
          </tr>
          <tr>
            <td>工地</td>
            <td>${marker.projectname}</td>
          </tr>
          <tr>
            <td>本车方量</td>
            <td>${marker.cubenum}</td>
          </tr>
          <tr>
            <td>车次</td>
            <td>${marker.bodyno}</td>
          </tr>
          <tr>
            <td>发货时间</td>
            <td>${marker.shipdatetime}</td>
          </tr>
          <tr>
            <td>驾驶员</td>
            <td></td>
          </tr>
          <tr>
            <td>是否砂浆</td>
            <td>非砂浆</td>
          </tr>
          <tr>
            <td>滚筒状态</td>
            <td>${gtState}</td>
          </tr>
          <tr>
            <td>当前状态</td>
            <td>${marker.workstatus}</td>
          </tr>
          
        </table>
        `
      }else{
        htmlStr = `
        <table class = "info-window no-task" >
          <tr class = "info-logo">
            <td><img style="width:60px;height:17px;" src="../../imgs/common/cucc.png" alt=""></td>
          </tr>
          <tr>
            <td>车号</td>
            <td>${marker.carid}</td>
          </tr>
          <tr>
            <td>定位时间</td>
            <td>${marker.gpsdatetime}</td>
          </tr>
          <tr>
            <td>速度</td>
            <td>${marker.speed}</td>
          </tr>
          <tr>
            <td>当前状态</td>
            <td>${marker.workstatus}</td>
          </tr>
          
        </table>
        `
      }
     
      this.infoWindow = new AMap.InfoWindow({
          content: htmlStr,  //使用默认信息窗体框样式，显示信息内容
          offset: new AMap.Pixel(5, -24)
      });
      this.infoWindow.open(this.map, new AMap.LngLat(glcLonLat.lon, glcLonLat.lat));
    }

  }
}