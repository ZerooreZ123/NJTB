// 销售龙虎榜
var template = `
<div class="columnContent block-bg">
  <div style="height: 320px;">
    <div style="width: 24%;height: 40%;position: relative;top: 15%;left: 38%;
    display:flex;flex-direction: column;justify-content: center;align-items: center;">
      <img src="../../imgs/hr/champion.png" style="position: absolute;top:0px;right: 0px;"/>
      <img src="../../imgs/hr/avatar.png" style="border-radius: 50%;"  />
      <span style="color:rgba(247,208,55,1);font-size:20px;margin-top:5px;">1 赵日天</span>
    </div>
    <div style="width: 20%;height: 35%;position: relative;top: 0%;left: 9%; 
    display:flex;flex-direction: column;justify-content: center;align-items: center;">
      <img src="../../imgs/hr/avatar.png"  style="border-radius: 50%;"  />
      <span style="color:rgba(207,125,53,1);font-size:20px;margin-top:5px;">2 叶良辰</span>
    </div>
    <div style="width: 20%;height: 35%;position: relative;top: -25%;left: 71%; 
    display:flex;flex-direction: column;justify-content: center;align-items: center;">
      <img src="../../imgs/hr/avatar.png" style="border-radius: 50%;"  />
      <span style="color:rgba(36,212,70,1);font-size:20px;margin-top:5px;">3 打我啊</span>
    </div>
  </div>
  <div style="display:flex;flex:1;flex-direction: column;font-size:35px;color:white;padding:0px 10px 0px 10px;">
    <div style="display:flex;flex:1;">
      <div style="display:flex;flex:1;justify-content: center;align-items: center;">
        <span>排名</span>
      </div>
      <div style="display:flex;flex:1;justify-content: center;align-items: center;">
        <span>姓名</span>
      </div>
    </div>
    <div style="display:flex;flex:1;margin-bottom:20px;background-color:rgba(52, 143, 237, 0.4);" 
    v-for="(item,index) in slers">
      <div style="display:flex;flex:1;justify-content: center;align-items: center;">
        <span>{{index+4}}</span>
      </div>
      <div style="display:flex;flex:1;justify-content: center;align-items: center;">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</div>`

var SaleRangking = Vue.extend({
  template: template,
  props: ['data'],
  data() {
    return {
      slers: [
        { name: 'sds', avatar: '' },
        { name: 'sds', avatar: '' },
        { name: 'sds', avatar: '' },
        { name: 'sds', avatar: '' },
        { name: 'sds', avatar: '' },
        { name: 'sds', avatar: '' },
        { name: 'sds', avatar: '' },
      ]
    };
  },
  mounted() {

  },
  methods: {

  }
});

