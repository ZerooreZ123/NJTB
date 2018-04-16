// 报警 车辆异常
var template = `
      <div class="columnContent" style="margin:0 0 5px 10px;">
        <div class="title center">
          <span style="font-size: 20px;">天宝混凝土物资异常信息一览表</span>
        </div>
        <div class="title center" style="background-color: rgba(52, 143, 237, 0.4);">
          <span style="font-size: 20px;">异常明细</span>
        </div>
        <div class="scrollbar itemsContent">
          <div class="block-bg item center" style="justify-content: flex-start;padding: 0 20px 0 20px;" v-for="item in data">
            <img v-bind:src="'../../imgs/warn/'+item.icon+'.png'" style="padding-right: 10px;" />
            <span style="font-size: 15px;">{{item.detail}}</span>
          </div>
        </div>
        <div class="block-bg footer" style="display: flex;">
          <div class="columnContent center" v-for="item in icons">
            <img v-bind:src="'../../imgs/warn/foot_'+item.icon+'.png'" />
            <span style="font-size: 15px; margin-top: 3px;">{{item.title}}</span>
          </div>
        </div>
      </div>`

var MaterialFault = Vue.extend({
  template: template,
  props: ['data'],
  data() {
    return {
      icons: [
        { title: '料仓', icon: 'bunker' },
        { title: '退还', icon: 'back' },
        { title: '转出', icon: 'rollout' },
        { title: '剩余', icon: 'left' },
        { title: '报废', icon: 'scrap' }
      ],
    }
  },
  mounted() {
  },
});

