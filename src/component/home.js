Vue.component('home', {
  template: `
  <div class="tabs">
    <span @click="toHome()" style="margin-left: 17px;">
      <img src="../../imgs/common/home.png" style="vertical-align: middle;">
      <span style="vertical-align: middle;">南京天宝</span>
    </span>
  </div>
`,
  methods: {
    toHome() {
      window.history.go(-1);
    }
  }

});