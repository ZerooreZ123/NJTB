// VTS生产快报组件
Vue.component("produce-news", {
  template: '<div style="height:100%;width:100%;" ref="produce"></div>',
  props: ["produceNews"],
  mounted() {
    if (this.produceNews) {
      this.initChart({ id: this.$refs.produce });
    }
  },
  watch: {
    produceNews() {
      if (this.produceNews) {
        this.updateChart();
      }
    }
  },
  destroyed() {
    if (this.pieChart) {
      this.pieChart.dispose();
      delete this.pieChart;
    }
  },
  methods: {
    initChart: function(item) {
      let remain = 0;
      if (
        parseInt(this.produceNews.concretenum) <
        parseInt(this.produceNews.amountNum)
      ) {
        remain = 0;
      } else {
        remain =
          parseInt(this.produceNews.concretenum) -
          parseInt(this.produceNews.amountNum);
      }
      this.pieChart = echarts.init(item.id);
      option = {
        // title: {
        //   text: '生产快报(m³)',
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: 14,
        //   },
        //   top: '1%',
        //   left: '1%'
        // },
        legend: {
          right: "1%",
          top: "1%",
          orient: "vertical",
          textStyle: {
            color: "white",
            fontSize: 11
          },
          formatter: "{name}",
          data: ["计划", "完成"]
        },
        graphic: {
          type: "text",
          left: "25%", // 相对父元素居中
          top: "middle", // 相对父元素居中
          style: {
            fill: "white",
            text: ["未完成方量\n\n" + remain],
            font: "10px Microsoft YaHei",
            textAlign: "center"
          }
        },
        series: [
          {
            type: "pie",
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
            center: ["36%", "55%"],
            label: {
              normal: {
                show: true,
                position: "outside",
                color: "#FFF",
                formatter: ["{a|{c}}", "{b|{b}}"].join("\n"),
                rich: {
                  a: {
                    color: "rgb(250,209,24)",
                    fontSize: "12",
                    align: "center"
                  },
                  b: {
                    color: "#FFF",
                    fontSize: "12"
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 2,
                length2: 6,
                lineStyle: {
                  color: "#fff"
                }
              }
            },
            data: [
              {
                name: "计划",
                itemStyle: {
                  normal: { color: "#07feda" }
                },
                value: parseInt(this.produceNews.concretenum)
              },
              {
                name: "完成",
                itemStyle: {
                  normal: { color: "rgba(52,143,237,0.55)" }
                },
                value: parseInt(this.produceNews.amountNum)
              }
            ]
          }
        ]
      };
      this.pieChart.setOption(option);
    },
    updateChart: function() {
      // console.log(this.produceNews.data.SumSend,this.produceNews.data.SumQuantity);
      var remain = 0;
      if (this.produceNews.data.SumSend < this.produceNews.data.SumQuantity) {
        remain =
          this.produceNews.data.SumQuantity - this.produceNews.data.SumSend;
      }
      option = {
        // title: {
        //   text: '生产快报(m³)',
        //   textStyle: {
        //     color: '#fff',
        //     fontSize: 14,
        //   },
        //   top: '1%',
        //   left: '1%'
        // },
        legend: {
          right: "1%",
          top: "1%",
          orient: "vertical",
          textStyle: {
            color: "white",
            fontSize: 11
          },
          formatter: "{name}",
          data: ["计划", "完成"]
        },
        graphic: {
          type: "text",
          left: "25%", // 相对父元素居中
          top: "middle", // 相对父元素居中
          style: {
            fill: "white",
            text: [this.produceNews.data.SumQuantity + "\n计划方量"],
            font: "12px Microsoft YaHei",
            textAlign: "center"
          }
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            center: ["40%", "68%"],
            label: {
              normal: {
                show: true,
                position: "outside",
                color: "#FFF",
                formatter: ["{a|{c}}", "{b|{b}}"].join("\n"),
                rich: {
                  a: {
                    color: "rgb(250,209,24)",
                    fontSize: "12",
                    align: "center"
                  },
                  b: {
                    color: "#FFF",
                    fontSize: "12"
                  }
                }
              }
            },
            labelLine: {
              normal: {
                show: true,
                lineStyle: {
                  color: "#fff"
                }
              }
            },
            data: [
              {
                name: "计划",
                itemStyle: {
                  normal: { color: "#2c85ea" }
                },
                value: this.produceNews.data.SumSend
              },
              {
                name: "完成",
                itemStyle: {
                  normal: { color: "rgba(52,143,237,0.15)" }
                },
                value: remain
              }
            ]
          }
        ]
      };
      this.pieChart.setOption(option);
    }
  }
});
