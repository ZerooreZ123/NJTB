// 地图 显示目标坐标
var template = `<div id="container" style="display: flex;flex: 1;border-radius: 5px;"></div>`

var content = `
<div style="display: flex;height:100px;width:350px;flex-direction: column;">
  <div style="display:flex;margin-bottom: 5px;justify-content: center;">    
    <span style="font-size:16px;color:white;border-radius: 5px;padding:10px;
    background-color:rgba(26, 147, 251, 1);">南京无框钟灵街项目二段总承包项目地</span>
  </div>
  <div style="display:flex;justify-content: center;"> 
    <img src="../../imgs/marketing/marker_icon.png" />
  </div>
</div>`

var MapMarker = Vue.extend({
  template: template,
  props: ['center', 'list'],
  mounted() {
    var map = new AMap.Map('container', {
    });
    var markers = [[118.758615, 31.973693], [118.820113, 32.076605], [118.782519, 32.051438], [118.859252, 32.030048]];
    for (var i = 0; i < markers.length; i += 1) {
      var marker = new AMap.Marker({
        position: markers[i],
        content: content,
        offset: new AMap.Pixel(-175, -100),
        map: map
      });
    }
    map.setFitView();
    map.setCenter([118.758615, 31.973693]);
    map.setZoom(map.getZoom() - 1);
  },
  methods: {
  }
});

