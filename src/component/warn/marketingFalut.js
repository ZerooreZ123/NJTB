// 报警 车辆异常
var template = `
<div class="columnContent" style="margin:0 10px 5px 10px;">
<div class="center title">
  <span class="font">天宝混凝土车辆异常信息一览表</span>
</div>
<div class="areaContent">
  <div class="columnContent">
    <div class="title subtitle" style="display: flex;">
      <div class="block-bg center" style="width:45px;margin-right: 1px;">
      </div>
      <div class="block-bg center" style="width:130px;margin-right: 1px;">
        <span class="font">合同单号</span>
      </div>
      <div class="block-bg center" style="flex:1;margin-right: 1px;">
        <span class="font">项目名称</span>
      </div>
      <div class="block-bg center" style="width:100px;margin-right: 1px;">
        <span class="font">异常明细</span>
      </div>
    </div>
    <div class="scrollbar itemsContent">
      <div class="item" style="display: flex;" v-for="item in data">
        <div class="block-bg center" style="width:45px;margin-right: 1px;">
          <img v-bind:src="'../../imgs/warn/'+item.type+'.png'" />
        </div>
        <div class="block-bg center" style="width:130px;margin-right: 1px;">
          <span style="font-size: 15px;">{{item.no}}</span>
        </div>
        <div class="block-bg center" style="flex:1;margin-right: 1px;">
          <span style="font-size: 15px;">{{item.name}}</span>
        </div>
        <div class="block-bg center" style="width:100px;margin-right: 1px;">
          <span style="font-size: 15px;color: red;">{{item.detail}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="block-bg footer" style="display: flex;">
  <div class="columnContent center" v-for="item in icons">
    <img v-bind:src="'../../imgs/warn/foot_'+item.icon+'.png'" />
    <span style="font-size: 15px; margin-top: 3px;">{{item.title}}</span>
  </div>
  <div class="columnContent"></div>
  <div class="columnContent"></div>
</div>
</div>`

var MarketingFault = Vue.extend({
  template: template,
  props: ['data'],
  data() {
    return {
      icons: [
        { title: '正式合同', icon: 'formal' },
        { title: '临时合同', icon: 'temp' },
        { title: '其他合同', icon: 'other' },
      ],
    }
  },
  mounted() {
  },
});

