// 生产模块 生产线组件
const template = `
  <div ref="produce" class = "block-bg" style="width: 950px;height:335px;">
    <div style="text-align: center;margin-top: 10px;">{{producetitle}}</div>
    <div style="margin-left:10px;">料仓余料</div>
    <div class="remain-wrap" style="margin-top: 20px;width:100%;height:260px;display: flex;justify-content: space-around;">
      <remain v-for="(remainitem, index) in produceData" :remain=remainitem :size="{width:96,height:210}"></remain>
    </div>
  </div>
`;

const Produce = {
  template: template,
  props: ["produceinfo", "producetitle"],
  components: {
    remain: Remain
  },
  data() {
    return {
      produceData: [],
      titleArr: []
    };
  },
  mounted() {
    let index = 0,
      space = 8,
      end = 8;

    const tempTimer = () => {
      if (end > this.produceinfo.length) {
        this.produceData = [
          ...this.produceinfo.slice(index * space, end),
          ...this.produceinfo.slice(0, end - this.produceinfo.length)
        ];
        (index = 0), (end = 8);
      } else {
        this.produceData = this.produceinfo.slice(index * space, end);
        index++;
        end = (index + 1) * space;
      }
    };
    tempTimer();
    setInterval(() => {
      tempTimer();
    }, 3000);
  },
  watch: {
    produceinfo() {}
  },
  destroyed() {}
};
