
//document.write('');
document.write('<script src="../../js/common/jquery-2.1.1.min.js" type="text/javascript" charset="utf-8"></script>');
document.write("<script language='javascript' src='../../js/common/echarts.min.js'></script>");
document.write("<script language='javascript' src='../../js/common/vue.js'></script>");
document.write("<script language='javascript' src='../../js/common/axios.min.js'></script>");
document.write("<script language='javascript' src='../../js/common/request.js'></script>");
document.write("<script language='javascript' src='../../component/home.js'></script>");

// 统一log 生产环境注释 ccj
function clog(value, split){
  // return;
  console.log(split || '------',value)
}

