
const ProjectMap = {
  template: `
    <div id = "map" style="width:100%;height:100%;"></div>
  `,
  props: ['project'],
  data: function () {
    return {
      markersArr:[],
      projectMarker:null,
    }
  },
  computed: {
    filterList() {
      
    }
  },
  mounted() {
    this.creatMap();
  },
  watch:{
    project(){
      this.map.remove(this.markersArr)
      this.addProjects(this.project);   //添加工程地标注
    }
  },
  methods: {
    creatMap: function () {
      this.map = new AMap.Map('map', {
        // layers: [new AMap.TileLayer.RoadNet(), new AMap.TileLayer.Traffic()],
        // zoom: 10
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
    addProjects: function (markers) {
      // 先清除之前的marker数组
      this.markersArr = [];
      let projectArr = [];
      markers.forEach(item => {
        if (item.centerLng || item.centerLat) {
          // console.log(item.projectName);
          projectArr.push(item);
        }
      });
      projectArr.forEach((item,index) => {
        const glcLonLat = GPS.gcj_encrypt(Number(item.centerLat), Number(item.centerLng));
        // [glcLonLat.lon, glcLonLat.lat]
        const projectId = 'markerproject' + index
        const marker = new AMap.Marker({
          map: this.map,
          content: `
            <div class="marker-vehicle">
              <div id = ${projectId} class="marker-title marker-project">${item.projectName}</div>
              <img  style="width: 20px;" class="marker-flag" src="../../imgs/common/workMarks.png">
            </div>
          `,
          position: [glcLonLat.lon, glcLonLat.lat],
          autoRotation: true,
          // clickable: true,
          topWhenClick: true,
          topWhenMouseOver: true
        });
       this.markersArr.push(marker);
        // 鼠标移动到地标上面显示工程详情
        
        // AMap.event.addListener(marker, "mouseover", e => {
        //   if (this.projectMarker) {
        //     this.projectMarker.setMap(null);
        //   }
        //   this.projectMarker = new AMap.Marker({
        //     map: this.map,
        //     content: `
        //       <div id = ${projectId} class="marker-title marker-project">${item.projectName}</div>
        //     `,
        //     position:  [glcLonLat.lon, glcLonLat.lat],
        //     offset: new AMap.Pixel(0, -50), 
        //   });
        // });
        // AMap.event.addListener(marker, "mouseout", e => {
        //   this.projectMarker.setMap(null);
        // });
        // 点击的工程把地图中心位置设为当前工程坐标
        AMap.event.addListener(marker, "click", e => {
          this.setMarkerCenter(item);
        });
      });
      this.map.setFitView();
    },
    
    markerClick: function (e, marker) {
      const markerInfo = marker.getExtData().markerInfo;
      // console.log(marker.getContent());
      // 在这里设置点击点标注时的动画效果
      // marker.setAnimation('AMAP_ANIMATION_DROP');
      this.openInfo(markerInfo);
    },
    setMarkerCenter: function(marker){
      const glcLonLat = GPS.gcj_encrypt(Number(marker.centerLat), Number(marker.centerLng));
      // [glcLonLat.lon, glcLonLat.lat]
      if(!marker.centerLat || !marker.centerLng) {
        this.projectMarker.setMap(null);
        return;
      };
     
      // 鼠标移动到地标上面显示工程详情
      if (this.projectMarker&&(marker.centerLat||marker.centerLng)) {
        this.projectMarker.setMap(null);
      }
      this.map.setCenter(new AMap.LngLat(glcLonLat.lon, glcLonLat.lat));
      // this.projectMarker = new AMap.Marker({
      //   map: this.map,
      //   content: `
      //     <div  class="marker-title marker-project">${marker.projectName}</div>
      //   `,
      //   position:  [glcLonLat.lon, glcLonLat.lat],
      //   offset: new AMap.Pixel(0, -50), 
      // });
    },
    openInfo(marker) {
      console.log(marker);
      //构建信息窗体中显示的内容
      let htmlStr = '';
    
      htmlStr = `
        <div class = "info-window" style="width:100px;height:100px;color:red">
          
        </div>
      `
      this.infoWindow = new AMap.InfoWindow({
          content: htmlStr  //使用默认信息窗体框样式，显示信息内容
      });
      // this.infoWindow.open(this.map, new AMap.LngLat(marker.centerLng, marker.centerLat));
    }

  }
}