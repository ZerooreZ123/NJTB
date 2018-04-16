// 生产模块 生产线组件
const template = `
  <div ref="produce" class = "block-bg" style="width: 950px;height:335px;">
    <div style="text-align: center;margin-top: 10px;">第一生产线</div>
    <div style="margin-left:10px;">料仓余料</div>
    <div class="remain-wrap" style="margin-top: 20px;width:100%;height:260px;display: flex;justify-content: space-around;">
      <remain v-for="(remainitem, index) in produceinfo" :remain="remainitem" :size="{width:96,height:210}"></remain>
    </div>
  </div>
`;

const Produce = {
  template: template,
  props: ['produceinfo'],
  components:{
    'remain':Remain,
  },
  mounted() {
  },
  watch: {
    produceinfo() {
    }
  },
  destroyed () {
    
  },

}