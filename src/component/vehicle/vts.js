(function() {
  const styles = {
    container: {
      backgroundColor: "rgba(52, 143, 237, 0.15)",
      width: "716px",
      height: "240px",
      marginLeft: "3px"
    },
    process: {
      height: "3px",
      backgroundColor: "#0091e8",
      width: "656px",
      display: "inline-block",
      marginLeft: "10px",
      verticalAlign: "middle",
      position: "relative"
    },
    processLeft: value => {
      return {
        backgroundColor: "orange",
        height: "100%",
        width: value + "%"
      };
    },
    processRight: value => {
      return {
        backgroundColor: "orange",
        height: "100%",
        width: value + "%",
        float: "right"
      };
    },
    carLeft: value => {
      return {
        position: "absolute",
        left: value + "%",
        top: "-8px",
        transform: 'translateX(-50%)'
      };
    },
    carRight: value => {
      return {
        position: "absolute",
        right: value + "%",
        top: "-8px",
        transform: 'translateX(50%)'
      };
    },
    row: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "5px"
    },
    col: {
      backgroundColor: "rgba(52, 143, 237, 0.15)",
      height: "135px",
      width: "235px"
    },
    carItem: {
      float: "left",
      backgroundColor: "#0091e8",
      padding: "3px 5px",
      marginLeft: "5px",
      marginTop: "5px"
    },
    carItemImg: {
      verticalAlign: "middle"
    }
  };
  const vtsTemplate = `
  <div :style="styles.container">
    <div>天宝1号</div>
    <div>任务ID:SH20140221&emsp;路程:10.78公里&emsp;C区16#17#楼</div>
    <div>去程:
      <div :style="styles.process">
        <div :style="styles.processLeft(50)"></div>
        <img :style="styles.carLeft(50)" src="../../imgs/vehicle/car/jbc.png">
      </div>
    </div>
    <div>返程:
      <div :style="styles.process">
        <div :style="styles.processRight(40)"></div>
        <img :style="styles.carRight(40)" src="../../imgs/vehicle/car/jbc.png">
      </div>
    </div>
    <div :style="styles.row">
      <div :style="styles.col">
        <div>工地车辆</div>
        <div :style="styles.carItem">678 <img :style="styles.carItemImg" src="../../imgs/vehicle/car/01.png"></div>
        <div :style="styles.carItem">678 <img :style="styles.carItemImg" src="../../imgs/vehicle/car/01.png"></div>
        <div :style="styles.carItem">678 <img :style="styles.carItemImg" src="../../imgs/vehicle/car/01.png"></div>
        <div :style="styles.carItem">678 <img :style="styles.carItemImg" src="../../imgs/vehicle/car/01.png"></div>
        <div :style="styles.carItem">678 <img :style="styles.carItemImg" src="../../imgs/vehicle/car/01.png"></div>
        <div :style="styles.carItem">678 <img :style="styles.carItemImg" src="../../imgs/vehicle/car/01.png"></div>
      </div>
      <div :style="styles.col">
        <produce-news :produceNews='cObj'></produce-news>
      </div>
      <div :style="styles.col">
        <div>预排车辆</div>
        <div :style="styles.carItem">678 <img :style="styles.carItemImg" src="../../imgs/vehicle/car/01.png"></div>
        <div :style="styles.carItem">678 <img :style="styles.carItemImg" src="../../imgs/vehicle/car/01.png"></div>
        <div :style="styles.carItem">678 <img :style="styles.carItemImg" src="../../imgs/vehicle/car/01.png"></div>
        <div :style="styles.carItem">678 <img :style="styles.carItemImg" src="../../imgs/vehicle/car/01.png"></div>
        <div :style="styles.carItem">678 <img :style="styles.carItemImg" src="../../imgs/vehicle/car/01.png"></div>
        <div :style="styles.carItem">678 <img :style="styles.carItemImg" src="../../imgs/vehicle/car/01.png"></div>
      </div>
    </div>
  </div>
  `;

  Vue.component("vts", {
    template: vtsTemplate,
    props: ["info", "comeback", "waynum"],
    components: {},
    filters: {
      cutDate(value) {
        if (value) {
          const time = value.split(" ")[1];
          const timeArray = time.split(":");
          return timeArray[1] + ":" + timeArray[2];
        } else {
          return "";
        }
      }
    },
    data() {
      return {
        styles: styles,
        cObj: {
          concretenum: 10,
          amountNum: 10
        }
      };
    },
    mounted() {},
    destroyed() {},
    updated() {},
    methods: {
      onTopClick() {
        this.$emit("topclick");
      }
    }
  });
})();
