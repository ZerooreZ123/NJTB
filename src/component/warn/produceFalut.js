// 报警 生产异常
var template = `
<div class="columnContent" style="margin:0 0 5px 10px;">
  <div class="title center">
    <span style="font-size: 20px;">天宝混凝土生产异常信息一览表</span>
  </div>
  <div class="title center" style="background-color: rgba(52, 143, 237, 0.4);">
    <span style="font-size: 20px;">事故原因</span>
  </div>
  <div class="scrollbar itemsContent">
    <div class="block-bg item center"
      v-for="(item,index) in data">
      <img v-bind:src="'../../imgs/warn/'+item+'.png'" />
    </div>
  </div>
  <div class="block-bg footer" style="display: flex;">
    <div class="columnContent center">
      <img src="../../imgs/warn/foot_unit.png" />
      <span style="font-size: 20px; margin-top: 3px;">机组故障</span>
    </div>
    <div class="columnContent center">
      <img src="../../imgs/warn/foot_network.png" />
      <span style="font-size: 20px; margin-top: 3px;">网络故障</span>
    </div>
    <div class="columnContent"></div>
    <div class="columnContent"></div>
  </div>
</div>`

var ProduceFalut = Vue.extend({
  template: template,
  props: ['data'],
  mounted() {
  },
});

