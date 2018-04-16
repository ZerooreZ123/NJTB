const mapTemplate = `
<div>
<!-- 切换VTS按钮放到外面页面!!! --> 
<!-- <div class="st_top">
   <ul style="display: inline-block;" @click="onTopClick()">
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div> --> 
  <div style="display: flex;justify-content: space-around;">
    <div class="stats_t" style="width:1516px;">
      <div id="map" style="width:100%;height:1010px;"></div>
    </div>
    <div class="stats_s news_tab" style="margin-top: 10px;">
      <div class="s_search">
        <p>车号：</p>
        <input type="text" v-model="keyword"/>
      </div>
      <div class="tables">
        <table>
          <tr>
            <th @click="sortTable('车号')">
              车号
              <template v-if="sortName=='车号'&&sort=='升'">↑</template>
              <template v-if="sortName=='车号'&&sort!='升'">↓</template>
            </th>
            <th @click="sortTable('滚筒')">
              滚筒
              <template v-if="sortName=='滚筒'&&sort=='升'">↑</template>
              <template v-if="sortName=='滚筒'&&sort!='升'">↓</template>
            </th>
            <th @click="sortTable('时速')">
              时速
              <template v-if="sortName=='时速'&&sort=='升'">↑</template>
              <template v-if="sortName=='时速'&&sort!='升'">↓</template>
            </th>
            <th @click="sortTable('状态')">
              状态
              <template v-if="sortName=='状态'&&sort=='升'">↑</template>
              <template v-if="sortName=='状态'&&sort!='升'">↓</template>
            </th>
          </tr>
          <tr v-for="obj in filterList" @click="setMarkerCenter(obj)">
            <td :style="{color: obj.onlinestatus == '离线' ? 'gray' : 'white' }">{{obj.carid}}</td>
            <td :style="{color: obj.onlinestatus == '离线' ? 'gray' : 'white' }">{{obj.cartype== '泵车' ? '泵车' : obj.isremove=='1' ? '卸料' : obj.ismixing=='1' ? '搅拌' : '停转'}}</td>
            <td :style="{color: obj.onlinestatus == '离线' ? 'gray' : 'white' }">{{obj.speed? (parseInt(obj.speed)).toFixed(0) : 0}}</td>
            <td :style="{color: obj.onlinestatus == '离线' ? 'gray' : 'white' }">{{obj.workstatus == '未知' ? '厂外' : obj.workstatus}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>
`;

const vmap = Vue.extend({
  template: mapTemplate,
  props: ["catlist"],
  data() {
    return {
      keyword: "",
      sortName: "车号",
      sort: "升"
    };
  },
  computed: {
    filterList() {
      const keyword = this.keyword;
      // 排序
      let sortedList = _.sortBy(this.catlist.carList, obj => {
        if (this.sortName == "车号") {
          return obj.carid;
        } else if (this.sortName == "滚筒") {
          return obj.cartype;
        } else if (this.sortName == "时速") {
          return obj.speed;
        } else if (this.sortName == "状态") {
          return obj.workstatus;
        }
      });
      if (this.sort == "升") {
        // none
      } else if (this.sort == "降") {
        sortedList = sortedList.reverse();
      }
      return sortedList.filter(obj => {
        const match_carid = obj.carid.indexOf(keyword) > -1;
        // const match_cartype = obj.cartype.indexOf(keyword) > -1
        // const match_speed = obj.speed.indexOf(keyword) > -1
        // const match_workstatus = obj.workstatus.indexOf(keyword) > -1
        // return match_carid || match_cartype || match_speed || match_workstatus
        return match_carid;
      });
    }
  },
  mounted() {
    this.creatMap();
  },
  updated() {
    console.log(11,this.catlist.carList);
    this.addVehicleMarker(this.catlist.carList); //添加车辆标注
    this.addProjects(this.catlist.carList); //添加工程地标注
  },
  destroyed() {},
  methods: {
    // onTopClick() {
    //   this.$emit("topclick");
    // },
    sortTable(sortName) {
      if (this.sortName == sortName) {
        if (this.sort == "升") {
          this.sort = "降";
        } else {
          this.sort = "升";
        }
      } else {
        this.sortName = sortName;
      }
      console.log(this.sortName, this.sort);
    },
    creatMap: function() {
      this.map = new AMap.Map("map", {
        // layers: [new AMap.TileLayer.RoadNet(), new AMap.TileLayer.Traffic()],
        // zoom: 12
      });
      AMapUI.setDomLibrary($);
      //加载BasicControl，loadUI的路径参数为模块名中 'ui/' 之后的部分
      AMapUI.loadUI(["control/BasicControl"], BasicControl => {
        //图层切换控件
        this.map.addControl(
          new BasicControl.LayerSwitcher({
            position: "rt" //right top，右上角
          })
        );
      });
    },
    addProjects: function(markers) {
     
      let projectArr = [];
      markers.forEach(item => {
        if (item.centerLng || item.centerLat) {
          console.log(item.projectname);
          projectArr.push(item);
        }
      });
      // console.log(this.catlist.stationInfo.centerlng,11);
      // projectArr.push({
      //   centerLng:this.catlist.stationInfo.centerlng,
      //   centerLat:this.catlist.stationInfo.centerLat,
      // })
      projectArr.forEach((item,index) => {
        const glcLonLat = GPS.gcj_encrypt(Number(item.centerLat), Number(item.centerLng));
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
        const  projectMarker = new AMap.Marker({
          map: this.map,
          content: `
            <div id = ${projectId} class="marker-title marker-project">${item.projectname}</div>
          `,
          position: [glcLonLat.lon, glcLonLat.lat],
          offset: new AMap.Pixel(0, -50), 
          topWhenMouseOver: true
        });
       
      });
      // 添加站点坐标
      const glcLonLat = GPS.gcj_encrypt(Number(this.catlist.stationInfo.centerLat), Number(this.catlist.stationInfo.centerlng));
        // [glcLonLat.lon, glcLonLat.lat]
      const stationMarker = new AMap.Marker({
        map: this.map,
        content: `
          <div class="">
            <img style="width: 20px;" class="marker-flag" src="../../imgs/common/factory.png">
          </div>
        `,
        position: [glcLonLat.lon, glcLonLat.lat],
        autoRotation: true,
        // clickable: true,
        topWhenClick: true,
        topWhenMouseOver: true
      });

      this.map.setFitView();
    },
    addVehicleMarker: function (markers) {
      
      let vehicleArr = [];
      markers.forEach(item=>{
        if (item.longitude||item.latitude) {
          vehicleArr.push(item);
        }
      })
      vehicleArr.forEach(item => {
        const glcLonLat = GPS.gcj_encrypt(Number(item.latitude), Number(item.longitude));
        // 对应车辆状态的marker
        const img_url = item.onlinestatus=== "离线" ? '../../imgs/common/offLine.png' : 
          item.cartype === "搅拌车" ? '../../imgs/common/jiaoban.png' : '../../imgs/common/bengche.png';
        const bg_color = item.color? item.color : '#FFF';
        const marker = new AMap.Marker({
          map: this.map,
          icon: "",
          content: `<div class="marker-vehicle" style = "position:relative;width: 90px;">
            <div style="position: absolute;left:24px;bottom:0;background:${bg_color};display: flex;align-items: center;margin-bottom: 2px;flex-direction: column;border:1px solid black;height:item.exceptionName?40px:20px;">
              <span style="font-size:12px;color:black;margin-top: -2px;">${item.carid}</span>
              <div style="color:black;font-size:12px;margin-top: -3px;">${item.exceptionName? item.exceptionName:''}</div>
            </div>
            <img src=${img_url} style="transform: rotate(${item.angle}deg);position:absolute;left:2px;bottom:0;">
          </div>`,
          position: [glcLonLat.lon, glcLonLat.lat],
          // angle: item.angle,
          // offset: new AMap.Pixel(-26, -13),
          autoRotation: true,
          // clickable: true,
          topWhenClick: true,
          topWhenMouseOver: true
        });
        // 设置用户自定义属性，支持JavaScript API任意数据类型，如Marker的id等(在点击marker的时候可以获取到对应属性)
        // marker.setExtData({ id: 1 });

        marker.setExtData({ markerInfo: item });
        AMap.event.addListener(marker, "click", e => {
          // 在点击点标注的时候把点传过去，在点击回调的方法里面设置点击点标注时的动画效果
          this.markerClick(e, marker);
        });
        AMap.event.addListener(this.map, "click", () => {
          if (this.infoWindow) {
            this.infoWindow.close();
          }
        });
      });
      this.map.setFitView();
    },
    markerClick: function(e, marker) {
      const markerInfo = marker.getExtData().markerInfo;
      // console.log(marker.getContent());
      // 在这里设置点击点标注时的动画效果
      // marker.setAnimation('AMAP_ANIMATION_DROP');
      this.openInfo(markerInfo);
    },
    setMarkerCenter: function(marker) {
      const glcLonLat = GPS.gcj_encrypt(Number(marker.latitude), Number(marker.longitude));
      // [glcLonLat.lon, glcLonLat.lat]
      this.map.setZoomAndCenter(16, [glcLonLat.lon, glcLonLat.lat]);
    },
    openInfo(marker) {
      const glcLonLat = GPS.gcj_encrypt(Number(marker.latitude), Number(marker.longitude));
      // [glcLonLat.lon, glcLonLat.lat]
      //构建信息窗体中显示的内容

      let htmlStr = '';
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
        `;
      } else {
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
        `;
      }

      this.infoWindow = new AMap.InfoWindow({
        content: htmlStr //使用默认信息窗体框样式，显示信息内容
      });
      this.infoWindow.open(
        this.map,
        new AMap.LngLat(glcLonLat.lon, glcLonLat.lat)
      );
    }
  }
});
