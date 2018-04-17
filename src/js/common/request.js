// const base_url = 'http://192.168.0.17:18080/CUCC/f/immc/'   //客户内网地址
// const base_url = 'http://192.168.1.33:8080/CUCC/f/immc/'; //外网
const base_url = 'http://192.168.1.22:3000/api';    //本地

// axios.defaults.headers.post['content-Type'] = 'appliction/x-www-form-urlencoded';
// axios.defaults.timeout = 5000;
axios.defaults.baseURL = base_url;
// axios.defaults.withCredentials = true;  //是否是跨域请求 default false,

const proxy = false;

function fetch(apiName, params) {
  if (proxy) {
    // return new Promise((resolve, reject) => {
    //   post(url, params)
    //     .then(response => {
    //       if (response.data.success) {
    //         resolve(response.data.response)
    //       } else {
    //         console.error("proxy:", response.data.error);
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // })
  } else {
    return new Promise((resolve, reject) => {
      const param = {
        apiName,
        params:{...params}
      };
      axios.post(base_url, param)
        .then(response => {
          resolve(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    })
  }
}

// function post(url, data) {
//   const ex = data.ex || 60;
//   delete data.ex;
//   // return axios.post('http://192.168.1.22:3000/proxy', {
//   return axios.post('http://49.4.71.57:3000/proxy', {
//     "url": base_url + url,
//     "data": data,
//     "method": "POST",
//     "ex": ex
//   })
// }

// // 料仓余料
// function getRemain(stationcode) {
//   return fetch('material/materialstorage/binStock', { stationcode })

// }
// // 生产快报
// function getProduceNews(stationcode) {
//   return fetch('produce/produce/produceNews', { stationcode })
// }
// // 车辆统计
// function getVehicle(stationcode) {
//   return fetch('car/carstatus/list', { stationcode })
// }
// // 人力资源
// function getHr(stationcode) {
//   var tommory = new Date();
//   tommory.setDate(tommory.getDate() + 1);
//   return fetch('att/attcheck/list', {
//     stationcode,
//     beginTime: formatDate(new Date(), 'yyyy-MM-dd'),
//     endTime: formatDate(tommory, 'yyyy-MM-dd'),
//   })
// }
// function getStationInfo(stationcode) {
//   return new Promise((resolve, reject) => {
//     axios.all([getRemain(stationcode), getProduceNews(stationcode), getVehicle(stationcode), getHr(stationcode)])
//       .then(axios.spread((a, b, c, d) => {
//         var res = {};
//         if (a.success) {
//           res.remain = a.list
//         }
//         if (b.success) {
//           res.produceNews = b.list;
//         }
//         if (c.success) {
//           res.vehicle = c.list
//         }
//         if (d.success) {
//           res.hr = d.list;
//         }
//         resolve(res);
//       }))

//   })
// }

// function formatDate(date, format) {
//   //format: "yyyy年MM月dd日hh小时mm分ss秒"
//   var o = {
//     "M+": date.getMonth() + 1, //month
//     "d+": date.getDate(), //day
//     "h+": date.getHours(), //hour
//     "m+": date.getMinutes(), //minute
//     "s+": date.getSeconds(), //second
//     "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
//     "S": date.getMilliseconds() //millisecond
//   };
//   if (/(y+)/.test(format)) {
//     format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
//   }
//   for (var k in o) {
//     if (new RegExp("(" + k + ")").test(format)) {
//       format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
//     }
//   }
//   return format;
// }

window.getvl = function (name) {
  var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
  if (reg.test(location.href)) {
    return unescape(RegExp.$2.replace(/\+/g, " "));
  }
  return "";
};