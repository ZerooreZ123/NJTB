// 营销汇款排名
var template = `
    <div class="columnContent" style="margin: 0px 0px 5px 5px;">
      <div style="display: flex;justify-content: center;height: 50px;font-size: 30px;">
        <span>{{title}}</span>
      </div>
      <div class="block-bg" 
      style="display: flex;flex: 1;padding-left: 17px;padding-right: 30px;flex-direction: column;">
        <div class="areaContent">
          <span class="rankingItem">排名</span>
          <span class="rankingItem">姓名</span>
        </div>
        <div v-for="(item,index) in rankingNames" class="rankingItem" 
        v-bind:style='index%2==0?"background-color: rgba(52, 143, 237, 0.4);border-radius: 3px;":""'>
          <div class="areaContent">
            <img class="rankingAvatar" v-if="index==0" v-bind:src="img" />
            <div class="rankingAvatar" v-else></div>
            <span>{{index}}</span>
          </div>
          <span class="rankingItem">{{item}}</span>
        </div>
      </div>
    </div>`

var Ranking = Vue.extend({
  template: template,
  props: ['type'],
  data() {
    return {
      title: new Date().format("YYYY年MM月  ") + (this.type == 'salesVol' ? "销量" : "回款") + "排名",
      img: "../../imgs/marketing/" + this.type + ".png",
      rankingNames: ['张飞', '立减', '刘欢天', '张杰', '俄文', '问我', '问问', '把 v 报告', '二二', '对方的', '俄文我']
    }
  },
  mounted() {
    if (this.type == 'salesvol') {

    } else if (this.type == 'payment') {

    }
  },
  methods: {

  }
});

Date.prototype.format = function (format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(Y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}