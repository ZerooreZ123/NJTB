// 报警 车辆异常
var template = `
      <div class="columnContent" style="margin:0 0 5px 10px;">
        <div class="center title">
          <span class="font">天宝混凝土车辆异常信息一览表</span>
        </div>
        <div class="areaContent">
          <div class="columnContent">
            <div class="center title subtitle" style="margin-right: 1px;">
              <span class="font">闲置超时</span>
            </div>
            <div class="scrollbar itemsContent">
              <div class="block-bg scrollbar center item carsItem" style="justify-content: flex-start;margin:0 1px 2px 0;"
                v-for="items in data.overTime">
                <div class="center" style="border-radius: 5px;padding: 5px;margin-right:5px;" v-bind:style="'background-color:'+(item.type==0?'#3b91ea':(item.type==1?'#d1b736':'#d12335'))"
                  v-for="(item,i) in items">
                  <span style="font-size: 12px;width: 60px">{{item.no}}</span>
                  <img v-bind:src="'../../imgs/warn/'+item.car+'.png'" />
                </div>
              </div>
            </div>
          </div>
          <div class="columnContent">
            <div class="center title subtitle" style="margin-right: 1px;">
              <span class="font">闲置车辆</span>
            </div>
            <div class="scrollbar itemsContent">
              <div class="block-bg scrollbar center item carsItem" style="justify-content: flex-start;margin:0 0 2px 0;"
                v-for="items in data.idleCars">
                <div class="center" style="border-radius: 5px;padding: 5px;margin-right:5px;" v-bind:style="'background-color:'+(item.type==0?'#3b91ea':(item.type==1?'#d1b736':'#d12335'))"
                  v-for="(item,i) in items">
                  <span style="font-size: 12px;width: 60px">{{item.no}}</span>
                  <img v-bind:src="'../../imgs/warn/'+item.car+'.png'" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="block-bg" style="display: flex;height: 70px;margin-top: 10px;">
          <div class="areaContent" style="justify-content: center;align-items: center;">
            <span style="font-size: 13px;padding: 5px;text-align: center;background-color: #3b91ea;">卸料间隔超30分钟
              <br/>到达工地1小时未卸料</span>
          </div>
          <div class="areaContent" style="justify-content: center;align-items: center;">
            <span style="font-size: 13px;padding: 5px;text-align: center;background-color: #d1b736;">卸料间隔超45分钟
              <br/>到达工地2小时未卸料</span>
          </div>
          <div class="areaContent" style="justify-content: center;align-items: center;">
            <span style="font-size:13px;padding: 5px;text-align: center;background-color: #d12335;">卸料间隔超60分钟
              <br/>到达工地3小时未卸料</span>
          </div>
        </div>
      </div>`

var CarsFalut = Vue.extend({
  template: template,
  props: ['data'],
  mounted() {
  },
});

