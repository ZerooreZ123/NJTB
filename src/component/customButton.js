// 多按钮切换组件
const customBtn = {
  props: ['data'],
  mounted() {
    this.btnClick(0);
  },
  data: function () {
    return {
      selectIndex: 0
    }
  },
  template: `
    <div class="btn-menu" style="display: flex;z-index: 100;">
      <a href="###" v-for="(item,index) in data" 
        style = "width: 90px;height: 25px;line-height: 25px;font-size: 14px;border-radius: 5px;margin: 5px 10px;text-align: center;"
        :style="{'background':selectIndex==index?'#2c85ea':'rgba(52,143,237,0.15)'}" @click="btnClick(index)"><div>{{item}}</div></a>
    </div>
  `,
  methods: {
    btnClick: function (index) {
      this.selectIndex = index;
      this.$emit('changchart', index);
    },
  }
}
