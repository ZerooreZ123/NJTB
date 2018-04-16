// 生产合同组件
(function () {
  const ProduceContract = `
      <div>
        <div style="width:430px;padding:0px;height:auto;margin:0 auto" v-for="(contract, contraIndex) in contractdata">
          <div class="head-wrap" style="cursor: pointer;display:flex;align-items:center" @click="toOpenMenu(contraIndex)">
            <img src="../../imgs/produce/book.png" alt="" class="dd">
            <span class="block-bg" style="margin-left:10px;padding:5px 8px">{{contract.headInfo.title}}</span>
            <span style="margin-left:5px;">({{contract.headInfo.headData}})</span>
          </div>
          <div class="content-wrap">
            <div class="content-border" style="margin-left: 16px;padding-left: 40px;font-size: 14px;"
            :style="{'height': selectHeadIndex==contraIndex? 'auto' :'10px','border-left': contraIndex==contractdata.length-1 ? '0' : '1px solid gray',}"
            >
              <div v-show="selectHeadIndex==contraIndex">
                <div v-for="(contractItem, index) in contract.contentInfo" style="cursor: pointer;height: 30px;display:flex;align-items: center;" @click="selectContract(contractItem, index)">
                  <img :src="selectContraIndex==index ? '../../imgs/produce/select.png' : '../../imgs/produce/unselect.png' " style="margin-right:5px;">
                  {{contractItem.title}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  const ProContract = {
    template: ProduceContract,
    props: ['contractdata', 'isClose'],
    data() {
      return {
        selectHeadIndex: 0,
        selectContraIndex: 0,
      }
    },
    watch: {

    },
    mounted() {

    },
    methods: {
      toOpenMenu(index) {
        console.log(index);
        this.selectHeadIndex = index;
        this.selectContract('', 0); //每次点击合同大标题到时候，默认先取该合同下的第一条数据，并且地图和右边的当日方量也跟着切换数据！！
      },
      selectContract(item, index) {
        this.selectContraIndex = index;
        console.log(index);
        // 在这里回传合同数据到页面上来切换 地图和右边的当日方量的数据！！！
      }
    }
  }

  Vue.component('pro-contract', ProContract)
})();


