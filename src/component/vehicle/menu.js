const vtsTemplate = `
<ul class="menu" :style="{left:x,top:y}">
  <li v-for="(obj, index) in info" @click="handleClick(obj,index)">{{obj.stationname}}</li>
</ul>
`

const Menu = Vue.extend({
  template: vtsTemplate,
  props: ['info','x','y'],
  // data() {
  //   return {
  //   }
  // },
  mounted() {
  },
  destroyed() {

  },
  updated() {
  },
  methods: {
    handleClick(obj,index) {
      obj.indx = index;
      console.log('你点击了菜单', JSON.stringify(obj))
      this.$emit('onmenuclick', obj)
    }
  }
})